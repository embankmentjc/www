#!/usr/bin/env bash

for f in `cat recover.txt`; do
    (
        stat -c%y new/$f | tuf .
        awk '/^Content-Type: text\/plain/{p=1;print;next} p&&/^Content-Type: text\/html/{p=0};p' new/$f \
        | sed "/^\s*$/d" \
        | sed "s/^[[:space:]]*//;s/[[:space:]]*$//" \
        | awk '/^The below person/{p=1;next} p&&/^This is an automatically/{p=0};p' \
        | tail -n+2 \
        | grep -v ':$'
    ) \
    | tr '\n' '\t'
    echo
done
