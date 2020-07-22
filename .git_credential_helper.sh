#!/bin/sh
test "$1" = "get" && echo "username=${GIT_USER}" && echo "password=${GIT_PASSWORD}"
