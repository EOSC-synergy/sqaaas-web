#!/bin/sh
echo -e "protocol=https\nhost=github.com\nusername=${GIT_USER}\npassword=${GIT_PASSWORD}" | git credential fill
