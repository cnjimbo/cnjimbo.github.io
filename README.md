<h1 align="center"> 代码收容所 </h1>
<p align="center">天道酬勤，恒以致遠</p>
<p align="center">博客主题：<a href="https://theme.sugarat.top/" target="_blank">@sugarat/theme</a></p>

[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

## 仓库介绍

这是一个 monorepo 仓库，目前有如下四个部分
* [blogpress](./packages/blogpress/)：博客内容本身
* [@sugarat/theme](./packages/theme/)：博客分离出的通用VitePress主题
* [创建主题模板项目CLI](./packages/create-theme/)：用于快速创建和作者一样风格的博客
* [vitepress-plugin-pagefind](./packages/vitepress-plugin-pagefind/)：基于pagefind实现的VitePress离线全文搜索支持插件
* [vitepress-plugin-rss](./packages/vitepress-plugin-rss/)：基于 feed 实现的 VitePress RSS 支持插件

## 快速创建博客模板
支持多种包管理工具
```sh
# With PNPM:
pnpm create @sugarat/theme

# With NPM:
npm create @sugarat/theme@latest

# With Yarn:
yarn create @sugarat/theme

# With Bun
bun create @sugarat/theme
```
## 运行本项目
这是一个 monorepo 仓库，博客基于[vitepress](https://vitepress.dev/)搭建，运行前需先安装依赖，构建主题包

① 先安装 `pnpm`
```sh
npm i -g pnpm
# 安装依赖
pnpm install
```

② 构建依赖包的npm包
```sh
pnpm buildlib
```

③ 运行
```sh
# 运行博客
pnpm dev

# 运行主题包文档
pnpm dev:theme
```

## :pencil:关于内容
代码的那些事

记录所遇的问题，并整理相关知识点，分模块进行了梳理

## :speak_no_evil:[关于笔者](./packages/blogpress/aboutme.md)
2006年毕业，40岁大叔，目前热爱大前端开发技术

热爱开源，乐于分享

![图片](/packages/blogpress/digital_pharmaceutical.jpg)

## :link:个人相关链接

* [代码收容所●博客园](https://www.cnblogs.com/68681395/)

## :phone:联系我
如对博客内容，知识，排版等有疑问或者建议，欢迎邮件和我联系

**邮箱:happycoder@foxmail.com**

![公众号](packages/blogpress/public/mp-code.png)

## :coffee:赞赏
 |                  微信赞赏                   | 微信赞赏 |
 | :-----------------------------------------: | :----: |
 | ![](/packages/blogpress/public/donate1.png) | ![](/packages/blogpress/public/donate1.png)  |
