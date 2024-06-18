---
title: 在提交pr请求后自动部署preview github pages
date: 2024-06-18
tags:
 - 技术笔记
 - 技术教程
categories:
 - github
 - actions
 - deploy
 - preview
---


许多第三方服务允许您创建分支和拉取请求的预览部署，以便您可以使用它们来审查和测试您的更改。此操作使您能够做同样的事情，但直接使用GitHub Pages。

特别是，此操作将您的网站部署到一个不同的仓库中，该仓库将包含您选择使用此操作的所有仓库的预览。

如果您对这个操作背后的逻辑感兴趣，您可以查看流程图。
