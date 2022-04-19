#!/usr/bin/env python

from argparse import ArgumentParser
from os.path import basename, exists
from re import fullmatch
import subprocess
from subprocess import CalledProcessError, DEVNULL, PIPE
from sys import stderr
from tempfile import TemporaryDirectory

from utz import cd, lines, mkpar, run

parser = ArgumentParser()
parser.add_argument('-b', '--branch', default='ftp', help="Git branch that is expected to track the FTP remote's state")
parser.add_argument('-n', '--dry-run', action='count', default=0, help='Set once for verify files only (downloads files but does not upload anything to remote server); twice to simply print which files would be verified/synced')
parser.add_argument('-r', '--ref', default='HEAD', help='Git ref to mirror to FTP remote')
parser.add_argument('remote', help='FTP/SSH coordinates to SFTP to')
args = parser.parse_args()
branch = args.branch
dry_run = args.dry_run
ref = args.ref
remote = args.remote
if ':' in remote:
    remote, path = remote.split(':', 2)
    path = path.rstrip('/')
else:
    path = None


def parse_name_status_line(ln):
    m = fullmatch('(?P<status>[ACDMRBX])\s+(?P<name>.*)', ln)
    if not m:
        raise RuntimeError(f'Unrecognized --name-status output line: {ln}')
    return m['status'], m['name']


SUPPORTED_STATUSES = 'AMD'


def changed_paths(start, end):
    status_names = [parse_name_status_line(ln) for ln in lines('git', 'diff', '--name-status', f'{start}..{end}')]
    status_map = {}
    for status, name in status_names:
        if status not in SUPPORTED_STATUSES:
            raise RuntimeError(f'Found unsupported diff status {status} for file {name}')
        if status not in status_map:
            status_map[status] = []
        names = status_map[status]
        names.append(name)
    return status_map


changed_paths_map = changed_paths(branch, ref)
added_files = changed_paths_map.get('A', [])
deleted_files = changed_paths_map.get('D', [])
changed_files = changed_paths_map.get('M', [])

mismatched_files = []

remote_files = changed_files + deleted_files
if remote_files:
    msg = 'Checking contents of '
    if changed_files:
        msg += f'{len(changed_files)} changed files'
        if deleted_files:
            msg += f' and {len(deleted_files)} deleted files'
    else:
        msg += f'{len(deleted_files)} deleted files'
    msg += f' from ref {branch} vs. remote {remote}'
    print(msg)
    if changed_files:
        print('Changed:')
        print('\t%s' % '\n\t'.join(changed_files))
    if deleted_files:
        print('Deleted:')
        print('\t%s' % '\n\t'.join(changed_files))


class Continue(Exception): pass


def verify_file(file, expect_missing=False):
    if path:
        rpath = f'{path}/{file}'
    else:
        rpath = file

    if dry_run == 2:
        print(f'Would check file: {file}')
        raise Continue

    def err(*lines):
        mismatched_files.append(file)
        [stderr.write('%s\n' % ln) for ln in lines]
        raise Continue

    print(f'Checking file: {file}')
    # Verify that this file's contents in Git (at `branch`) match what's on the FTP `remote` (before overwriting anything on the FTP `remote`, we want to know the current contents are what we expect!)
    with TemporaryDirectory() as dir:
        if expect_missing:
            try:
                run('git', 'show', f'{branch}:{file}', stderr=DEVNULL)
                err(f'File {file} appears to exist in ref {branch}')
            except CalledProcessError as e:
                if e.returncode != 128:
                    err(f'git show {branch}:{file} exited with unexpected code {e.returncode} (expected 128)')
        else:
            # Write out the version of the file in Git from `branch` to a temp location
            local_dir = f'{dir}/local'
            local_path = f'{local_dir}/{file}'
            mkpar(local_path)
            with open(local_path, 'wb') as f:
                run('git', 'show', f'{branch}:{file}', stdout=f)

        # Pull down the version from the FTP `remote`
        remote_dir = f'{dir}/remote'
        remote_path = f'{remote_dir}/{basename(file)}'
        mkpar(remote_path)
        with cd(remote_dir):
            cmd = f'get {rpath}'
            print(f'FTP: {cmd}')
            subprocess.run(['sftp', remote], stdout=PIPE, stderr=PIPE, input=cmd.encode(), check=True)

        if expect_missing:
            if exists(remote_path):
                err(f'git show {branch}:{file} exited with unexpected code {e.returncode} (expected 128)')
        else:
            if not exists(remote_path):
                err(f'File {file} not found on FTP remote {remote}')
            diff_lines = lines('diff', local_path, remote_path, err_ok=True)
            if diff_lines:
                err(
                    'Found different contents:',
                    *diff_lines,
                )


for file in remote_files:
    try:
        verify_file(file)
    except Continue:
        pass

for file in added_files:
    try:
        verify_file(file, expect_missing=True)
    except Continue:
        pass

if mismatched_files:
    raise RuntimeError(
        f"Remote `{remote}`: contents of {len(mismatched_files)} files didn't match {branch}'s:\n\t%s\n" % "\n\t".join(
            mismatched_files))


def md5sum(file, BUF_SIZE=2 ** 16):
    import hashlib

    md5 = hashlib.md5()
    with open(file, 'rb') as f:
        while True:
            data = f.read(BUF_SIZE)
            if not data:
                break
            md5.update(data)

    return md5.hexdigest()


for file in (changed_files + added_files):
    if path:
        dst = f'{path}/{file}'
    else:
        dst = file

    with TemporaryDirectory() as dir:
        src = f'{dir}/{file}'
        mkpar(src)
        with open(src, 'wb') as f:
            run('git', 'show', f'{ref}:{file}', stdout=f)

        cmd = f'put {src} {dst}'
        if dry_run >= 1:
            print(f'Would put file: {src} → {dst} (SHA256: {md5sum(src)})')
            continue

        print(f'Uploading file {file} to {dst}: {cmd}')
        subprocess.run(['sftp', remote], stdout=PIPE, stderr=PIPE, input=cmd.encode(), check=True)

for file in deleted_files:
    if path:
        dst = f'{path}/{file}'
    else:
        dst = file

    cmd = f'rm {dst}'
    if dry_run >= 1:
        print(f'Would rm file: {dst}')
        continue

    subprocess.run(['sftp', remote], stdout=PIPE, stderr=PIPE, input=cmd.encode(), check=True)
