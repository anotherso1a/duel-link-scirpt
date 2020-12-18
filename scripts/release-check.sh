if [ -z $RELEASE ]; then
  echo "❗️请使用 npm run release [release-type] 进行代码发布!"
  echo ""
  echo "❗️使用 npm version --help 查看 release-type 所支持的选项"
  echo ""
  exit 1
fi
