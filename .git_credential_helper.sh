#!/bin/sh
test "$1" = "get" && echo "protocol=https" && echo "host=github.com" && echo "username=${GIT_USER}" && echo "password=${GIT_PASSWORD}"
