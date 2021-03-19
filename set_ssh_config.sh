#!/usr/bin/env bash

set -ex

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
