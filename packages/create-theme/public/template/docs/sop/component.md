---
description: 默认支持流程图，tabs面板，待办列表，作品页面
---

# 内置第三方插件能力
## task-checkbox
* Type: `boolean | TaskCheckbox`

支持渲染 markdown 任务列表，内置 [markdown-it-task-checkbox](https://github.com/linsir/markdown-it-task-checkbox) 插件提供支持

* [ ] 🥔 TODO
* [ ] 真不戳
* [x] 内置任务列表

语法如下
```md
* [ ] 🥔 TODO
* [ ] 真不戳
* [x] 内置任务列表
```

默认开启，你可以进一步配置

:::code-group
```ts [① 关闭]
const blogTheme = getThemeConfig({
  taskCheckbox: false
})
```
```ts [② 进一步配置]
const blogTheme = getThemeConfig({
  taskCheckbox: {
    // refer https://github.com/linsir/markdown-it-task-checkbox for options
  }
})
```
```ts [③ type]
interface TaskCheckbox {
  disabled?: boolean
  divWrap?: boolean
  divClass?: string
  idPrefix?: string
  ulClass?: string
  liClass?: string
}
```
:::



## tabs
* Type: `boolean`

支持局部的`tabs`面板，**默认开启**

:::details 我之前手动安装配置了怎么办？
① package.json 中移除 vitepress-plugin-tabs 依赖

② .vitepress/theme/index.ts 中移除注册的组件`enhanceAppWithTabs`

③ （可选）`getThemeConfig` 中移除配置项`tabs`
:::
:::tip 一点说明
基于 [vitepress-plugin-tabs@0.2.0](https://www.npmjs.com/package/vitepress-plugin-tabs) 内置实现
:::

效果如下

:::=tabs
::tab1
一些内容

一些内容

一些内容

::tab2
一些内容 。。。
:::

简单的使用方式如下（效果如上面的示例）

```md
:::=tabs
::tab1
一些内容

一些内容

一些内容

::tab2
一些内容 。。。
:::
```

共享状态的使用方式如下

```md
:::=tabs=ab
::a
a content

::b
b content
:::

:::=tabs=ab
::a
a content 2

::b
b content 2
:::
```


:::=tabs=ab
::a
a content

::b
b content
:::

:::=tabs=ab
::a
a content 2

::b
b content 2
:::

不需要也可以关闭

```ts
// .vitepress/blog-theme.ts
const blogTheme = getThemeConfig({
  tabs: false
})
```

## Mermaid - 图表
* Type: `boolean`|`object`

>通过解析类 Markdown 的文本语法来实现图表的创建和动态修改。

:::tip 一点说明
基于 [vitepress-plugin-mermaid](https://github.com/emersonbottero/vitepress-plugin-mermaid) 实现
:::

简单语法如下，详细流程图语法见 [Mermaid 中文文档](https://github.com/mermaid-js/mermaid/blob/develop/README.zh-CN.md)

<pre>
```mermaid
flowchart TD
  Start --> Stop
```
</pre>


效果如下

```mermaid
flowchart TD
  Start --> Stop
```

**默认开启**，可以通过`mermaid`进行进一步配置，或关闭

:::code-group
```ts [① 关闭]
const blogTheme = getThemeConfig({
  mermaid: false
})
```
```ts [② 进一步配置]
const blogTheme = getThemeConfig({
  mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  }
})
```
:::

下面看一下官方其它案例

**时序图**
```mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
```

**甘特图**
```mermaid
gantt
    section Section
    Completed :done,    des1, 2014-01-06,2014-01-08
    Active        :active,  des2, 2014-01-07, 3d
    Parallel 1   :         des3, after des1, 1d
    Parallel 2   :         des4, after des1, 1d
    Parallel 3   :         des5, after des3, 1d
    Parallel 4   :         des6, after des4, 1d
```

## UserWorksPage
* Type: `UserWorks`

用于作品列表展示

效果如下，详见 [个人作品展示](https://theme.sugarat.top/work.html)

![](https://img.cdn.sugarat.top/mdImg/MTY4NzA4ODczMzkwNg==687088733906)

新建一个`works.md`文件，放入以下内容
  
```md
---
layout: page
title: 个人作品展示
sidebar: false
outline: [2,3]
sticky: 1
---
<UserWorksPage />
```

内容配置方式如下

::: code-group

```ts [default]
const blogTheme = getThemeConfig({
  works: {
    title: '个人项目/线上作品',
    description: '记录开发的点点滴滴',
    topTitle: '举些🌰',
    list: [
      {
        title: '博客主题 @sugarat/theme',
        description: '基于 vitepress 实现的博客主题',
        time: {
          start: '2023/01/29'
        },
        github: {
          owner: 'ATQQ',
          repo: 'sugar-blog',
          branch: 'master',
          path: 'packages/theme'
        },
        status: {
          text: '自定义badge'
        },
        url: 'https://theme.sugarat.top',
        cover:
          'https://img.cdn.sugarat.top/mdImg/MTY3MzE3MDUxOTMwMw==673170519303',
        tags: ['Vitepress', 'Vue'],
        links: [
          {
            title: '一个简约风的VitePress博客主题',
            url: 'https://juejin.cn/post/7196517835380293693'
          }
        ]
      }
    ]
  }
})
```

```ts [type]
interface UserWorks {
  title: string
  description?: string
  topTitle?: string
  list: UserWork[]
}
interface UserWork {
  title: string
  description: string
  time:
  | string
  | {
    start: string
    end?: string
    lastupdate?: string
  }
  status?: {
    text: string
    type?: 'tip' | 'warning' | 'danger'
  }
  url?: string
  github?:
  | string
  | {
    owner: string
    repo: string
    branch?: string
    path?: string
  }
  cover?:
  | string
  | string[]
  | {
    urls: string[]
    layout?: 'swiper' | 'list'
  }
  links?: {
    title: string
    url: string
  }[]
  tags?: string[]
  top?: number
}
```

:::
