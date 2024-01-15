# Loni UI
> 忍冬 - 基于Vue的移动端通用UI组件库
### 运行本地预览
```
yarn serve
```
### 编译打包组件库
```
yarn build
```
### 编译组件库Demo及说明文档
```
yarn dist
```
### 代码检测
```
yarn lint
```
### 项目依赖升级
```
yarn up
```
### 自动解析iconfont文件到项目中
```
yarn iconfont
```
### 快捷创建loni组件模板文件
```
loni-create --inherit
```
### 自动将所有组件在main.ts中导出
```
loni-list
```

## 项目中使用
### 按需引入
```javascript
import Vue from "vue";
import {
    Button,
    Cell,
    CellItem
} from "loni";

Vue.use(Button);
Vue.use(Cell);
Vue.use(CellItem);
```

### 全局配置
全局配置的属性比组件上传入的属性优先级低，有些组件的部分属性不支持全局配置
```javascript
import { config } from "loni";

config.button.background = "linear-gradient(-90deg, #f74c52, #dc3b40)";
config.dialog.title = "提示";
```
