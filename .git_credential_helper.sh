#!/bin/sh
test "$1" = get && echo -e "username=${GIT_USER}\npassword=${GIT_PASSWORD}"
