#!/usr/bin/env python

from utz import *

from argparse import ArgumentParser
parser = ArgumentParser()
parser.add_argument('-b','--branch',default='ftp',help="Git branch that is expected to track the FTP remote's state")
parser.add_argument('-n','--dry-run',action='count',default=0,help='Set once for verify files only (downloads files but does not upload anything to remote server); twice to simply print which files would be verified/synced')
parser.add_argument('-r','--ref',default='HEAD',help='Git ref to mirror to FTP remote')
parser.add_argument('remote',help='FTP/SSH coordinates to SFTP to')
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


files_to_update = lines('git','diff','--name-only',f'{branch}..{ref}')
if files_to_update:
    print(f'Checking contents of {len(files_to_update)} files from ref {branch} vs. remote {remote}')


mismatched_files = []
for file in files_to_update:
    if path:
        rpath = f'{path}/{file}'
    else:
        rpath = file
    
    if dry_run == 2:
        print(f'Would check file: {file}')
        continue

    print(f'Checking file: {file}')
    # Verify that this file's contents in Git (at `branch`) match what's on the FTP `remote` (before overwriting anything on the FTP `remote`, we want to know the current contents are what we expect!)
    with TemporaryDirectory() as dir:
        # Write out the version of the file in Git from `branch` to a temp location
        local_dir = f'{dir}/local'
        local_path = f'{local_dir}/{file}'
        mkpar(local_path)
        with cd(local_dir):
            with open(file, 'wb') as f:
                run('git','show',f'{branch}:{file}', stdout=f)

        # Pull down the version from the FTP `remote`
        remote_dir = f'{dir}/remote'
        remote_path = f'{remote_dir}/{basename(file)}'
        mkpar(remote_path)
        with cd(remote_dir):
            cmd = f'get {rpath}'
            print(f'FTP: {cmd}')
            subprocess.run(['sftp',remote], stdout=PIPE, stderr=PIPE, input=cmd.encode(), check=True)
        
        diff_lines = lines('diff', local_path, remote_path, err_ok=True)
        if diff_lines:
            stderr.write('%s\n' % 'Found different contents:')
            [ stderr.write('%s\n' % line) for line in diff_lines ]
            mismatched_files.append(file)


if mismatched_files:
    raise RuntimeError(f"Remote `{remote}` contents of {len(mismatched_files)} didn't match {branch}'s:\n\t%s" % "\n\t".join(mismatched_files))


def md5sum(file, BUF_SIZE=2**16):
    import hashlib

    md5 = hashlib.md5()
    with open(file, 'rb') as f:
        while True:
            data = f.read(BUF_SIZE)
            if not data:
                break
            md5.update(data)

    return md5.hexdigest()


for file in files_to_update:
    if path:
        dst = f'{path}/{file}'
    else:
        dst = file
    
    print('Uploading file: {file}')
    with TemporaryDirectory() as dir:
        src = f'{dir}/{file}'
        mkpar(src)
        with open(src, 'wb') as f:
            run('git','show',f'{ref}:{file}', stdout=f)

        cmd = f'put {src} {dst}'
        if dry_run == 1:
            print(f'Would put file: {src} → {dst} (SHA256: {md5sum(src)})')
            continue

        subprocess.run(['sftp',remote], stdout=PIPE, stderr=PIPE, input=cmd.encode(), check=True)
