#!/bin/sh

HOST_NAME="$1"
secondString="_"
DIR_NAME=${HOST_NAME//-/$secondString}

scp "${HOST_NAME}:/opt/bitnami/projects/${HOST_NAME}/${DIR_NAME}.sql" "./"
