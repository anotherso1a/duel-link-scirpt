#!/bin/bash

BRANCH=`git branch -a|grep '.*\*'|sed 's/[*[:space:]]*//g'` # 当前分支
STATUS=`git status --porcelain` # working tree
PRE="pre" # 预发（beta）标识

if [ "$STATUS" ]; then
  echo "❗️请先清理 workingtree 后再进行发布！"
  echo ""
  exit 1
fi

if [ -z "$1" ]; then
  type='patch'
else
  type=$1
fi

isPre=$(echo $type | grep "${PRE}")

if [ -z "$isPre" ] && [ $BRANCH != "main" ]; then
  echo ""
  echo "❗️只能在main分支进行release，请将分支合并至main后进行release ！"
  echo ""
  echo "🤚或使用 npm run release <premajor | preminor | prepatch | prerelease> 发布beta版本"
  echo ""
  exit 1
fi

export RELEASE="release"

npm version $type

git push origin --tag
