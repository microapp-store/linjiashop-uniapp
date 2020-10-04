<p align="center">
    <img alt="logo" src="http://microapp.gitee.io/linjiashop/logo.jpg" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h3 align="center" style="margin: 30px 0 30px;font-weight: bold;font-size:40px;">uView</h3>
<h3 align="center">邻家小铺uniapp（全平台）版本</h3>

[![star](https://gitee.com/microapp/linjiashop-uniapp/badge/star.svg)](https://gitee.com/microapp/linjiashop-uniapp/stargazers)
[![fork](https://gitee.com/microapp/linjiashop-uniapp/badge/fork.svg)](https://gitee.com/microapp/linjiashop-uniapp/members)
[![stars](https://img.shields.io/github/stars/microapp-store/linjiashop-uniapp?style=flat-square&logo=GitHub)](https://github.com/microapp-store/linjiashop-uniapp)
[![forks](https://img.shields.io/github/forks/microapp-store/linjiashop-uniapp?style=flat-square&logo=GitHub)](https://github.com/microapp-store/linjiashop-uniapp)
[![issues](https://img.shields.io/github/issues/microapp-store/linjiashop-uniapp?style=flat-square&logo=GitHub)](https://github.com/microapp-store/linjiashop-uniapp/issues)
[![Website](https://img.shields.io/badge/uView-up-blue?style=flat-square)](http://microapp.gitee.io/linjiashop)
[![release](https://img.shields.io/github/v/release/microapp-store/linjiashop-uniapp?style=flat-square)](https://gitee.com/microapp-store/linjiashop-uniapp/releases)
[![license](https://img.shields.io/github/license/microapp-store/linjiashop-uniapp?style=flat-square)](https://en.wikipedia.org/wiki/MIT_License)

## 说明

linjiashop-uniapp，是[邻家小铺](http://microapp.gitee.io/linjiashop/)的uniapp版本，通过uniapp技术大道一套代码覆盖全平台(H5,Android,IOS,小程序)的目的

## [官方文档：http://microapp.gitee.io/linjiashop/](http://microapp.gitee.io/linjiashop/)

### [点击加群交流反馈：254059156](http://qm.qq.com/cgi-bin/qm/qr?k=EEHjlB4XyM-Kh2eMCbRPRoT38-V3au0T&authKey=NE856fZKPJLjtJTwOA1MlWWtcATVwT4e3zhjCOHeye8am2posApW%2Fw%3D%3D&group_code=254059156)

## 特性

- 一套代码兼容安卓，iOS，微信小程序，H5，QQ小程序，（百度小程序，支付宝小程序，头条小程序等其他平台也可以通过简单的适配进行兼容）


## 预览

您可以通过**微信**扫码，查看最佳的演示效果。
<br>
<br>
<img src="https://uviewui.com/common/weixin_mini_qrcode.png" width="220" height="220" >


## 友情链接

#### **linjiashop** —— [基于SpringBoot和Vue.js的轻量级小商城](http://microapp.gitee.io/linjiashop/)

#### **linjiashop-flutter** —— [邻家小铺的flutter版本](https://gitee.com/microapp/linjiashop-flutter)

#### **web-flash** —— [基于SpringBoot和Vue.js 后台管理脚手架](https://enilu.gitee.io/web-flash/)

#### **material-admin** —— [web-flash的单体版本（相对于web-flash的前后端分离版本）](https://enilu.gitee.io/material-admin/)
<br>

## 链接

- [官方文档](http://microapp.gitee.io/linjiashop/)
- [更新日志](https://uviewui.com/components/changelog.html)
- [升级指南](https://uviewui.com/components/changelog.html)
- [关于我们](https://uviewui.com/cooperation/about.html)

## 交流反馈

欢迎加入QQ群交流反馈：[254059156](http://qm.qq.com/cgi-bin/qm/qr?k=EEHjlB4XyM-Kh2eMCbRPRoT38-V3au0T&authKey=NE856fZKPJLjtJTwOA1MlWWtcATVwT4e3zhjCOHeye8am2posApW%2Fw%3D%3D&group_code=254059156)

## 安装

#### **下载地址** —— [https://ext.dcloud.net.cn/plugin?id=1593](https://ext.dcloud.net.cn/plugin?id=1593)

## 快速上手

1. `main.js`引入uView库
```js
// main.js
import uView from 'uview-ui';
Vue.use(uView);
```

2. `App.vue`引入基础样式(注意style标签需声明scss属性支持)
```css
/* App.vue */
<style lang="scss">
@import "uview-ui/index.scss";
</style>
```

3. `uni.scss`引入全局scss变量文件
```css
/* uni.scss */
@import "uview-ui/theme.scss";
```

4. `pages.json`配置easycom规则(按需引入)

```js
// pages.json
{
	"easycom": {
		// 下载安装的方式需要前面的"@/"，npm安装的方式无需"@/"
		// 下载安装方式
		"^u-(.*)": "@/uview-ui/components/u-$1/u-$1.vue"
		// npm安装方式
		// "^u-(.*)": "uview-ui/components/u-$1/u-$1.vue"
	},
	// 此为本身已有的内容
	"pages": [
		// ......
	]
}
```

请通过[快速上手](https://uviewui.com/components/quickstart.html)了解更详细的内容

## 使用方法
配置easycom规则后，自动按需引入，无需`import`组件，直接引用即可。

```html
<template>
	<u-button>按钮</u-button>
</template>
```

请通过[快速上手](https://uviewui.com/components/quickstart.html)了解更详细的内容


## 捐赠uView的研发

uView文档和源码全部开源免费，如果您认为uView帮到了您的开发工作，您可以捐赠uView的研发工作，捐赠无门槛，哪怕是一杯可乐也好(相信这比打赏主播更有意义)。

<img src="https://uviewui.com/common/wechat.png" width="220" >
<img style="margin-left: 100px;" src="https://uviewui.com/common/alipay.png" width="220" >

## 版权信息
uView遵循[MIT](https://en.wikipedia.org/wiki/MIT_License)开源协议，意味着您无需支付任何费用，也无需授权，即可将uView应用到您的产品中。
