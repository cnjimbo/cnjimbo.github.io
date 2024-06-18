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


A lot of third-party services allow you create preview deployments of branches and pull requests, so that you can use them to review and test your changes. This action allows you to do the same thing, but directly with GitHub Pages.

In particular, this action deploys your website to a different repo, which will contain the previews of all the repos you choose to use this on.

If you're interested in the logic behind this action, you can check out the flow diagram.
