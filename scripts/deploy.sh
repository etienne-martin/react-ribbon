#!/bin/bash

# Exit when any command fail
set -eo pipefail

TIMESTAMP=$(date +%s)

# Get package name from package.json
PACKAGE_NAME=$(cat package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

# Get package version from package.json
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

npm config set //registry.npmjs.org/:_authToken="${NPM_AUTH_TOKEN}"

if npm show "$PACKAGE_NAME" version | grep -w "$PACKAGE_VERSION" > /dev/null; then
  echo "Package $PACKAGE_NAME@$PACKAGE_VERSION already exists, publishing to @next"
  npm version "$PACKAGE_VERSION-next-$TIMESTAMP"
  npm publish --tag next
else
  npm publish
fi