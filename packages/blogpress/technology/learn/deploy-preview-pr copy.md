---
title: 在提交pr请求后自动部署preview github pages
date: 2024-06-18
tags:
 - 技术笔记
 - 技术教程
 - github
 - actions
 - deploy
 - preview
categories:
 - github
 - actions
 - deploy
 - preview
created: 2024-06-18T20:04:04 (UTC +08:00)

source:
author: EndBug
---
# 在提交pr请求后自动部署preview github pages

> ## Excerpt
> :octocat: 一个GitHub Action，用于为拉取请求（PR）和分支创建GitHub Pages预览 —— EndBug/pages-preview

## Table of contents

- [What does it do?](#what-does-it-do)
- [Setup](#setup)
- [Inputs](#inputs)

## What does it do?

许多第三方服务允许您创建分支和拉取请求的预览部署，以便您可以利用这些预览来审查和测试您的更改。此操作同样能实现这一功能，但它是直接通过GitHub Pages来完成。

具体而言，此操作会将您的网站部署到一个不同的仓库中，该仓库将会包含您选择应用此操作的所有仓库的预览版本。

如果您对这个操作背后的逻辑感兴趣，您可以查阅[流程图文档](docs/flow_diagram.md)。

## Setup

### Preview repo

#### Using my template

1. 首先，访问[此模板](https://github.com/EndBug/preview-template)，并从那里生成您的仓库：点击`Use this template`，填写仓库名称和描述，确认已勾选 `Include all branches`，然后创建仓库。

2. 接着，进入您的仓库设置，在“Pages”（仓库设置> Pages）选项卡中，将“GitHub Actions”设置为源。这样配置后，每当有新的推送或拉取请求，GitHub Actions将自动部署预览页面。

#### Manually

1. 创建一个新的存储库以承载你的预览内容。
   这个存储库将用于来自你所有存储库的预览，因此你只需要一次性设置它。

2. 确保这个存储库包含两个分支：`main` 和 `gh-pages`（你也可以选择不同的名称）。
    - `main` 应该是你的默认分支，它仅保存工作流文件（以及你可能想要添加的其他文件，如 README、许可证等）。
    - `gh-pages` 分支将包含实际的预览内容，初始化时应为空。

3. 在 `main` 分支中创建一个新文件，并将其命名为 `.github/workflows/preview.yml`。然后，将 `[`dependents/preview-repo.yml`](dependents/preview_repo.yml)` 中的内容复制到该文件中。
   通常情况下，你无需修改这个文件中的任何内容，所有配置选项都应在源存储库的工作流中设定。
   如果你更新动作到不同的主要版本，这个文件可能需要进行相应的更新。

4. 进入你的存储库设置，在“Pages”标签页下（仓库设置 > Pages），并将“GitHub Actions”设为页面发布来源。

### Personal Access Token (PAT)

In order for the action to be able to trigger the deployment in the preview repo from the source repo, you'll need to create a Personal Access Token (PAT).

There are currently two types of PATs: fine-grained, which are more secure but still in beta, and classic. I'd suggest to use fine-grained PATs, but if you can't, you can also use classic PATs.

#### Fine-grained PAT

1. Go to [Account settings > Developer settings > Fine-grained tokens](https://github.com/settings/tokens?type=beta).
2. Click on "Generate new token".
3. Give it a recognizable name and set an appropriate expiration date.
4. Make sure that the "Resource owner" is the same user/org that owns the preview repo.
5. Set the "Repository access" to "Only selected repositories" and then select the preview repo.
6. In the "Repository permissions" sections, set "Actions" and "Content" to "Read and write". "Metadata" will also be granted as "Read-only", as it is required for the other two.
7. Click on "Generate token", copy the token and save it somewhere for later.

#### Classic PAT

1. Go to [Account settings > Developer settings > Tokens (classic)](https://github.com/settings/tokens).
2. Click on "Generate new token" > "Generate new token (classic)"
3. Give it a recognizable name and set an appropriate expiration date.
4. Select the `repo` scope.
5. Click on "Generate token", copy the token and save it somewhere for later.

### Source repo

This steps need to be repeated for each repo you want to use this action on.

1. Go to the repo that contains the source code of your website.
2. Go to Repo settings > Secrets and variables > Actions.
3. Create a new repository secret called `PREVIEW_TOKEN` and paste the PAT you created in the previous step.
4. Go back to the repo contents and add the deployment workflow: you can either create a new one or add the same steps to your existing one. Use the [`dependents/source-repo.yml`](dependents/source_repo.yml) file as a template/example.
  Make sure to change the `PREVIEW_REPO` and `PAGES_BASE` env variable, along with the commands needed to build your website.
  Also, make sure to change `EndBug/pages-preview`'s inputs to match your needs: more info on that in the ["Inputs"](#inputs) section of this file.

All done! You're now ready to use the action 🎉

## Inputs

```yaml
- uses: EndBug/pages-preview@v1
  with:
    # The directory in which the website has been built, in the a/b/c format
    build_dir: build

    # The GitHub Pages base URL of the preview repo
    preview_base_url: https://octocat.github.io/preview

    # The repository to push previews to, in the Owner/Name format
    preview_repo: octocat/preview

    # The token to access the preview repo, that you created during setup
    preview_token: ${{ secrets.PREVIEW_TOKEN }}

    # --- OPTIONAL ---
    # The name of the environment to use for the deployment
    # Default: 'preview'
    deployment_env: development

    # Whether to use the deployments API
    # Default: 'true'
    deployments: false

    # The name of the author of the resulting commit
    # Default: the GitHub Actor
    git_author_name: Mona

    # The email of the author of the resulting commit
    # Default: the GitHub Actor's
    git_author_email: mona@users.noreply.github.com

    # The committer of the resulting commit
    # Default: copies git_author_name
    git_committer_name: GitHub Actions

    # The email of the committer of the resulting commit
    # Default: copies git_author_email
    git_committer_email: 41898282+github-actions[bot]@users.noreply.github.com

    # Whether to comment on PRs
    # Default: 'true'
    pr_comment: 'false'

    # The name of the branch that hosts the previews
    # Default: gh-pages
    preview_branch: custom-pages-branch

    # The name of the workflow file that contains the comment workflow in the preview repo
    # Default: preview.yml
    preview_workflow_file_name: custom_workflow.yml
```
