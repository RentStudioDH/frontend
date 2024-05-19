#!/bin/bash

cd "$(dirname "$0")/docker"

docker-compose build

docker-compose up -d
