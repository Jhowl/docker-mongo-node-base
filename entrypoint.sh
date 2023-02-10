#!/bin/bash

npm run dev &
mongo --eval "db = db.getSiblingDB('telegraf'); db.createUser({user: 'telegraf_user', pwd: 'telegraf_password', roles: [{role: 'readWrite', db: 'telegraf'}]})"
