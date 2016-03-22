#!/bin/zsh

git fetch origin 'refs/tags/*:refs/tags/*'

LAST_VERSION=$(git tag -l | sort -t. -k 1,1n -k 2,2n -k 3,3n -k 4,4n | tail -n 1)
NEXT_VERSION=$(echo $LAST_VERSION | awk -F. -v OFS=. 'NF==1{print ++$NF}; NF>1{if(length($NF+1)>length($NF))$(NF-1)++; $NF=sprintf("%0*d", length($NF), ($NF+1)%(10^length($NF))); print}')
VERSION=${1-${NEXT_VERSION}}
RELEASE_BRANCH="release/$VERSION"

git add .
git commit -am "Better"
git push

git checkout -b $RELEASE_BRANCH develop
gulp build
git add .
git commit -am "Build $NEXT_VERSION"

git checkout master
git merge $RELEASE_BRANCH

git checkout develop
git merge $RELEASE_BRANCH
git push origin develop

git checkout master
git tag $VERSION
git push origin master --tags

git checkout develop
