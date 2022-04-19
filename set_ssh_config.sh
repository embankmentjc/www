#!/usr/bin/env bash

set -ex

if [ -z "$SSH_PRIVKEY" ]; then
    echo "\$SSH_PRIVKEY env var required" >&2
    exit 11
fi
if [ -z "$SSH_PUBKEY" ]; then
    echo "\$SSH_PUBKEY env var required" >&2
    exit 12
fi
if [ -z "$FTP_HOST" ]; then
    echo "\$FTP_HOST env var required" >&2
    exit 13
fi
if [ -z "$FTP_USER" ]; then
    echo "\$FTP_USER env var required" >&2
    exit 14
fi

SSH_HOST="${SSH_HOST:-$FTP_HOST}"

mkdir -p "$HOME/.ssh"

echo "$SSH_PRIVKEY" > "$HOME/.ssh/${FTP_HOST}"
chmod 600 "$HOME/.ssh/${FTP_HOST}"

echo "$SSH_PUBKEY" > "$HOME/.ssh/${FTP_HOST}.pub"
chmod 644 "$HOME/.ssh/${FTP_HOST}.pub"

cat >>"$HOME/.ssh/config" <<EOF
Host $SSH_HOST
  HostName $FTP_HOST
  User $FTP_USER
  IdentitiesOnly yes
  IdentityFile ~/.ssh/$FTP_HOST
EOF

echo "Appended to SSH config $HOME/.ssh/config:"
cat "$HOME/.ssh/config"
