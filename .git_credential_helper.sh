#!/bin/sh
test "$1" = get && echo -e "Username=${GIT_USER}\nPassword=${GIT_PASSWORD}"
