#!/usr/bin/env bash

if [[ "x$1" != "x" ]]; then
	BRANCH_NAME="$1"
else
	BRANCH_NAME=$(git symbolic-ref -q HEAD)
	BRANCH_NAME=${BRANCH_NAME##refs/heads/}
	BRANCH_NAME=${BRANCH_NAME##release/}
	BRANCH_NAME=${BRANCH_NAME:-HEAD}
fi
export BRANCH_NAME

docker-compose -f docker-compose.yml build --no-cache
