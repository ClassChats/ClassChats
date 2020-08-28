#!/bin/bash

docker-compose up -d
docker-compose exec backend bash --rcfile "/classchats/.dev/.bashrc"
