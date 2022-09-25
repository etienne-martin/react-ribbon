#!/bin/bash

# Exit when any command fail
set -eo pipefail

# Uses npx so the CI can run the audit step alongside the install step
npx improved-yarn-audit@^3.0.0 \
  --min-severity moderate \
  --ignore-dev-deps \
  --retry-on-network-failure
