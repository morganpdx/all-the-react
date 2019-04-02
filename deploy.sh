#!/bin/bash

export AWS_PROFILE=personal

npm run build

aws s3 sync dist/ s3://morganpdx-github-battle/

echo 'http://morganpdx-github-battle.s3-website-us-west-2.amazonaws.com'