#!/bin/bash

echo "git diff --color | cat"
git diff --color | cat

echo "git add -v ."
git add -v .

echo "git commit -m "
git commit -m "$1"

echo $1

echo "git push"
git push

# echo "git checkout -f"
# git checkout -f
