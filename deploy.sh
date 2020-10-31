#!/bin/bash
AWS_DEFAULT_PROFILE=softcraft
BUCKET_NAME=timer.kanook.net/
rm -rf dist/*
webpack --mode production
aws s3 sync --delete dist s3://$BUCKET_NAME
