#!/bin/bash

PYTHON=$(which python3)
PYTHON=${PYTHON:-python}

$PYTHON -m pip install -r requirements.txt
mkdir -p public/data
$PYTHON convert.py ./public/data/all.json
cp data/by-list.json ./public/data/by-list.json

yarn install
yarn start
