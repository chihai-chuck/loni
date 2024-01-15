将从iconfont网站中下载的字体图标压缩包文件放在此文件夹内，文件名需要是 `download.zip`，下载后正常是不需要重命名，不需要解压

然后在项目根目录（package.json所在目录）下运行命令 `pnpm iconfont`

即会自动将字体和icon类名提取至项目样式中，处理完成后会自动删除`download.zip`

> 如果在本目录下存在名为`pdk-iconfont-working`的文件夹可手动删除，这是脚本运行时产生的临时文件夹，正常在脚本运行完成后都会自动清除
