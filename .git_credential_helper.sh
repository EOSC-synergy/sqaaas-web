#!/bin/sh
if test "$1" = get; then
    echo "username=${GIT_USER}"
    echo "password=${GIT_PASSWORD}"
fi
