import { getThemeConfig } from '@sugarat/theme/node'
import type { Theme } from '@sugarat/theme'
import { defineConfig } from 'vitepress'
import { La51Plugin } from 'vitepress-plugin-51la'

const baseUrl = process.env.FULL_URL ?? 'https://www.dmsrs.org'
const relativeUrl = process.env.PUBLIC_URL ?? ''
const weekly = `${baseUrl}/weekly`
const RSSWeekly: Theme.RSSOptions = {
  title: '视野修炼 - 技术周刊',
  baseUrl,
  description: '每周会精选出一些 优质&有趣 的内容做推送（大前端为主），包含但不限于 优质文章，开源库，工具网站，有意思的知识',
  id: weekly,
  link: weekly,
  language: 'zh-cn',
  filter(value) {
    return value.url.startsWith('/weekly/') && !value.url.endsWith('/weekly/')
  },
  image: `${relativeUrl}/assert/weelylogo.png`,
  favicon: `${baseUrl}/favicon.ico`,
  copyright: 'Copyright (c) 2018-present, 代码收容所',
  url: `${baseUrl}/weekly.rss`,
  icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5155" width="200" height="200"><title>收容报告 RSS 订阅</title><path d="M831.8 128l-640 0c-35.3 0-64 28.7-64 64l0 640c0 35.3 28.7 64 64 64l640 0c35.3 0 64-28.7 64-64L895.8 192C895.8 156.7 867.1 128 831.8 128zM707.4 193l0 185.8L673 344.3c-6.4-6.4-14.9-9.5-23.3-9.4-8.4-0.2-16.9 2.9-23.3 9.4L592 378.8 592 193 707.4 193zM831.8 833.1l-640 0L191.8 193 528 193l0 263c0 0.5 0 1.1 0 1.6 0 0.3 0 0.5 0.1 0.7 0 0.3 0 0.5 0.1 0.8 0 0.3 0.1 0.6 0.1 0.9 0 0.2 0 0.4 0.1 0.6 0 0.3 0.1 0.7 0.2 1 0 0.2 0.1 0.3 0.1 0.5 0.1 0.3 0.1 0.7 0.2 1 0 0.2 0.1 0.3 0.1 0.5 0.1 0.3 0.2 0.7 0.3 1 0.1 0.2 0.1 0.4 0.2 0.5 0.1 0.3 0.2 0.6 0.3 0.9 0.1 0.2 0.1 0.4 0.2 0.6 0.1 0.3 0.2 0.5 0.3 0.8 0.1 0.2 0.2 0.5 0.3 0.7 0.1 0.2 0.2 0.5 0.3 0.7 0.1 0.3 0.2 0.5 0.3 0.8 0.1 0.2 0.2 0.4 0.3 0.6 0.1 0.3 0.3 0.6 0.4 0.8 0.1 0.2 0.2 0.3 0.3 0.5 0.2 0.3 0.3 0.6 0.5 0.9 0.1 0.2 0.2 0.3 0.3 0.4 0.2 0.3 0.4 0.6 0.6 0.9 0.1 0.1 0.2 0.3 0.3 0.4 0.2 0.3 0.4 0.6 0.6 0.8 0.1 0.2 0.2 0.3 0.4 0.5 0.2 0.2 0.4 0.5 0.6 0.7 0.2 0.2 0.4 0.4 0.5 0.6 0.2 0.2 0.3 0.4 0.5 0.6 0.7 0.8 1.5 1.5 2.2 2.2 0.2 0.2 0.4 0.3 0.6 0.5 0.2 0.2 0.4 0.4 0.6 0.5 0.2 0.2 0.5 0.4 0.7 0.6 0.2 0.1 0.3 0.3 0.5 0.4 0.3 0.2 0.6 0.4 0.8 0.6 0.1 0.1 0.3 0.2 0.4 0.3 0.3 0.2 0.6 0.4 0.9 0.6 0.1 0.1 0.3 0.2 0.4 0.3 0.3 0.2 0.6 0.3 0.9 0.5 0.2 0.1 0.3 0.2 0.5 0.3 0.3 0.1 0.6 0.3 0.8 0.4 0.2 0.1 0.4 0.2 0.6 0.3 0.3 0.1 0.5 0.2 0.8 0.3 0.2 0.1 0.5 0.2 0.7 0.3 0.2 0.1 0.5 0.2 0.7 0.3 0.3 0.1 0.5 0.2 0.8 0.3 0.2 0.1 0.4 0.1 0.6 0.2 0.3 0.1 0.6 0.2 0.9 0.3 0.2 0.1 0.4 0.1 0.5 0.2 0.3 0.1 0.6 0.2 1 0.3 0.2 0 0.3 0.1 0.5 0.1 0.3 0.1 0.7 0.2 1 0.2 0.2 0 0.4 0.1 0.5 0.1 0.3 0.1 0.7 0.1 1 0.2 0.2 0 0.4 0.1 0.6 0.1 0.3 0 0.6 0.1 0.9 0.1 0.3 0 0.5 0 0.8 0.1 0.2 0 0.5 0 0.7 0.1 0.5 0 1.1 0 1.6 0 0 0 0 0 0 0l0 0c0.5 0 1.1 0 1.6 0 0.3 0 0.5 0 0.7-0.1 0.3 0 0.5 0 0.8-0.1 0.3 0 0.6-0.1 0.9-0.1 0.2 0 0.4 0 0.6-0.1 0.3 0 0.7-0.1 1-0.2 0.2 0 0.4-0.1 0.5-0.1 0.3-0.1 0.7-0.1 1-0.2 0.2 0 0.3-0.1 0.5-0.1 0.3-0.1 0.6-0.2 1-0.3 0.2-0.1 0.4-0.1 0.5-0.2 0.3-0.1 0.6-0.2 0.9-0.3 0.2-0.1 0.4-0.1 0.6-0.2 0.3-0.1 0.5-0.2 0.8-0.3 0.2-0.1 0.5-0.2 0.7-0.3 0.2-0.1 0.5-0.2 0.7-0.3 0.3-0.1 0.5-0.2 0.8-0.4 0.2-0.1 0.4-0.2 0.6-0.3 0.3-0.1 0.6-0.3 0.8-0.4 0.2-0.1 0.3-0.2 0.5-0.3 0.3-0.2 0.6-0.3 0.9-0.5 0.1-0.1 0.3-0.2 0.4-0.3 0.3-0.2 0.6-0.4 0.9-0.6 0.1-0.1 0.3-0.2 0.4-0.3 0.3-0.2 0.6-0.4 0.8-0.6 0.2-0.1 0.3-0.2 0.5-0.4 0.2-0.2 0.5-0.4 0.7-0.6 0.2-0.2 0.4-0.3 0.6-0.5 0.2-0.2 0.4-0.3 0.6-0.5 0.4-0.4 0.8-0.7 1.1-1.1l67.1-67.1 67.1 67.1c0 0 0 0 0 0 0.4 0.4 0.7 0.7 1.1 1.1 0.2 0.2 0.4 0.3 0.6 0.5 0.2 0.2 0.4 0.4 0.6 0.5 0.2 0.2 0.5 0.4 0.7 0.6 0.2 0.1 0.3 0.3 0.5 0.4 0.3 0.2 0.6 0.4 0.8 0.6 0.1 0.1 0.3 0.2 0.4 0.3 0.3 0.2 0.6 0.4 0.9 0.6 0.1 0.1 0.3 0.2 0.4 0.3 0.3 0.2 0.6 0.3 0.9 0.5 0.2 0.1 0.3 0.2 0.5 0.3 0.3 0.1 0.6 0.3 0.8 0.4 0.2 0.1 0.4 0.2 0.6 0.3 0.3 0.1 0.5 0.2 0.8 0.3 0.2 0.1 0.5 0.2 0.7 0.3 0.2 0.1 0.5 0.2 0.7 0.3 0.3 0.1 0.5 0.2 0.8 0.3 0.2 0.1 0.4 0.1 0.6 0.2 0.3 0.1 0.6 0.2 0.9 0.3 0.2 0.1 0.4 0.1 0.5 0.2 0.3 0.1 0.6 0.2 1 0.3 0.2 0 0.3 0.1 0.5 0.1 0.3 0.1 0.7 0.2 1 0.2 0.2 0 0.4 0.1 0.5 0.1 0.3 0.1 0.7 0.1 1 0.2 0.2 0 0.4 0.1 0.6 0.1 0.3 0 0.6 0.1 0.9 0.1 0.3 0 0.5 0 0.8 0.1 0.2 0 0.5 0 0.7 0.1 1.1 0.1 2.1 0.1 3.2 0 0.3 0 0.5 0 0.7-0.1 0.3 0 0.5 0 0.8-0.1 0.3 0 0.6-0.1 0.9-0.1 0.2 0 0.4 0 0.6-0.1 0.3 0 0.7-0.1 1-0.2 0.2 0 0.4-0.1 0.5-0.1 0.3-0.1 0.7-0.1 1-0.2 0.2 0 0.3-0.1 0.5-0.1 0.3-0.1 0.6-0.2 1-0.3 0.2-0.1 0.4-0.1 0.5-0.2 0.3-0.1 0.6-0.2 0.9-0.3 0.2-0.1 0.4-0.1 0.6-0.2 0.3-0.1 0.5-0.2 0.8-0.3 0.2-0.1 0.5-0.2 0.7-0.3 0.2-0.1 0.5-0.2 0.7-0.3 0.3-0.1 0.5-0.2 0.8-0.3 0.2-0.1 0.4-0.2 0.6-0.3 0.3-0.1 0.6-0.3 0.8-0.4 0.2-0.1 0.3-0.2 0.5-0.3 0.3-0.2 0.6-0.3 0.9-0.5 0.1-0.1 0.3-0.2 0.4-0.3 0.3-0.2 0.6-0.4 0.9-0.6 0.1-0.1 0.3-0.2 0.4-0.3 0.3-0.2 0.6-0.4 0.8-0.6 0.2-0.1 0.3-0.2 0.5-0.4 0.2-0.2 0.5-0.4 0.7-0.6 0.2-0.2 0.4-0.3 0.6-0.5 0.2-0.2 0.4-0.3 0.6-0.5 0.8-0.7 1.5-1.5 2.2-2.2 0.2-0.2 0.3-0.4 0.5-0.6 0.2-0.2 0.4-0.4 0.5-0.6 0.2-0.2 0.4-0.5 0.6-0.7 0.1-0.2 0.2-0.3 0.4-0.5 0.2-0.3 0.4-0.6 0.6-0.8 0.1-0.1 0.2-0.3 0.3-0.4 0.2-0.3 0.4-0.6 0.6-0.9 0.1-0.1 0.2-0.3 0.3-0.4 0.2-0.3 0.3-0.6 0.5-0.9 0.1-0.2 0.2-0.3 0.3-0.5 0.1-0.3 0.3-0.6 0.4-0.8 0.1-0.2 0.2-0.4 0.3-0.6 0.1-0.3 0.2-0.5 0.4-0.8 0.1-0.2 0.2-0.5 0.3-0.7 0.1-0.2 0.2-0.5 0.3-0.7 0.1-0.3 0.2-0.5 0.3-0.8 0.1-0.2 0.1-0.4 0.2-0.6 0.1-0.3 0.2-0.6 0.3-0.9 0.1-0.2 0.1-0.4 0.2-0.5 0.1-0.3 0.2-0.6 0.3-1 0-0.2 0.1-0.3 0.1-0.5 0.1-0.3 0.2-0.7 0.2-1 0-0.2 0.1-0.4 0.1-0.5 0.1-0.3 0.1-0.7 0.2-1 0-0.2 0.1-0.4 0.1-0.6 0-0.3 0.1-0.6 0.1-0.9 0-0.3 0-0.5 0.1-0.8 0-0.2 0-0.5 0.1-0.7 0-0.5 0-1.1 0-1.6L771.1 193l60.3 0L831.4 833.1z" p-id="5156"></path><path d="M468.7 416c0 17.7-14.3 32-32 32l-148 0c-17.7 0-32-14.3-32-32l0 0c0-17.7 14.3-32 32-32l148 0C454.4 384 468.7 398.3 468.7 416L468.7 416z" p-id="5157"></path><path d="M772.3 565c0 17.7-14.3 32-32 32L291.3 597c-17.7 0-32-14.3-32-32l0 0c0-17.7 14.3-32 32-32l449.1 0C758 533 772.3 547.3 772.3 565L772.3 565z" p-id="5158"></path><path d="M771.4 702c0 17.7-14.3 32-32 32L291.3 734c-17.7 0-32-14.3-32-32l0 0c0-17.7 14.3-32 32-32l448.2 0C757.1 670 771.4 684.4 771.4 702L771.4 702z" p-id="5159"></path></svg>',
  ariaLabel: '收容报告RSS订阅',
  filename: 'weekly.rss',
}
const RSS: Theme.RSSOptions = {
  title: '代码收容所',
  baseUrl,
  description: '天道酬勤，恒以致遠',
  id: baseUrl,
  link: baseUrl,
  language: 'zh-cn',
  image: `${relativeUrl}/assert/sitelogo.png`,
  favicon: `${baseUrl}/favicon.ico`,
  copyright: 'Copyright (c) 2018-present, 代码收容所',
  url: `${baseUrl}/feed.rss`,
  /**
   * 最近100篇，避免太大影响解析
   */
  limit: 100
}

const blogTheme = getThemeConfig({
  imageStyle: {
    // coverPreview: [
    //   // 七牛云
    //   {
    //     rule: '//img.cdn.sugarat.top',
    //     suffix: '~cover.webp',
    //   },
    //   // 又拍云CDN
    //   {
    //     rule: '//cdn.upyun.sugarat.top',
    //     suffix: '-cover',
    //   },
    // ],
  },
  themeColor: 'el-blue',
  RSS: [RSS, RSSWeekly],
  author: '代码收容所',
  comment: {
    repo: 'cnjimbo/cnjimbo.github.io',
    repoId: 'R_kgDOLK_y4A',
    category: 'Comments',
    categoryId: 'DIC_kwDOLK_y4M4Cfqnu',
    inputPosition: 'top',
  },
  oml2d: {
    mobileDisplay: true,
    models: [
      {
        path: 'https://model.oml2d.com/Senko_Normals/senko.model3.json',
      },
    ],
    libraryUrls: {
      complete: 'https://unpkg.com/oh-my-live2d@latest',
    },
  },
  popover: {
    title: '公告',
    body: [
      { type: 'text', content: '👇公众号👇---👇 微信 👇' },
      {
        type: 'image',
        src: '/mp-code2.png',
      },
      {
        type: 'text',
        content: '欢迎大家私信&加群交流',
      },
      {
        type: 'button',
        content: '关于作者',
        link: '/aboutme',
      },
      {
        type: 'button',
        content: '加群交流',
        props: {
          type: 'success',
        },
        link: '/group',
      },
    ],
    duration: -1,
    twinkle: true
  },
  friend: {
    list: [
      {
        nickname: '一叶浮萍',
        des: '幽谷清风 深潭碧波 寂清静宁',
        avatar:
          `${relativeUrl}/assert/avatar/logo-white.png`,
        url: 'https://www.cnblogs.com/68681395',
      },

    ],
    random: true,
    limit: 6,
  },
  search: {
    showDate: true,
    pageResultCount: 4,
  },
  recommend: {
    showSelf: true,
    nextText: '下一页',
    style: 'sidebar'
  },
  authorList: [
    {
      nickname: '代码收容所',
      url: `${baseUrl}/aboutme.html`,
      des: '天道酬勤，恒以致遠',
    }
  ],
  footer: {
    copyright: `代码收容所 2006 - ${new Date().getFullYear()}`,
    icpRecord: {
      name: '京ICP备14018270号',
      link: 'https://beian.miit.gov.cn/',
    },
    message: '',
  },
  hotArticle: {
    pageSize: 12,
  },
  buttonAfterArticle: {
    openTitle: '投"币"支持',
    closeTitle: '下次一定',
    content: '<img src="/donate.png">',
    icon: 'wechatPay',
  },
})

const extraHead: any
  // eslint-disable-next-line style/multiline-ternary
  = process.env.NODE_ENV === 'production' ? [
    [
      'script',
      {
        charset: 'UTF-8',
        id: 'BAIDU_TONGJI',
        defer: true,
        src: 'https://hm.baidu.com/hm.js?b48d57d263dacefaa9070edcdf045a6b',
      },
    ],
  ] : []

export default defineConfig({
  base: relativeUrl,
  extends: blogTheme,
  metaChunk: true,
  markdown: {
    image: {
      lazyLoading: true,
    },
  },
  ignoreDeadLinks: true,
  sitemap: {
    hostname: `${baseUrl}`,
  },
  lang: 'zh-cn',
  title: '代码收容所',
  description:
    '代码收容所的个人博客，记录随笔与学习笔记，大前端相关的知识，项目管理，股票等',
  head: [
    // <meta name="baidu-site-verification" content="codeva-b08avp82Uj" />
    ['meta', { name: 'baidu-site-verification', content: 'codeva-b08avp82Uj' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon.ico', type: 'image/png' }],
    [
      'link',
      {
        rel: 'alternate icon',
        href: '/favicon.ico',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    ['meta', { name: 'author', content: '代码收容所' }],
    ['link', { rel: 'mask-icon', href: '/favicon.ico', color: '#ffffff' }],
    [
      'link',
      { rel: 'apple-touch-icon', href: '/favicon.ico', sizes: '180x180' },
    ],
    ...extraHead,
  ],
  vite: {
    server: {
      port: 4000,
      host: '0.0.0.0',
    },
    plugins: [
      La51Plugin({
        id: '3IeB5Nny4fc4uQvw',
        ck: '3IeB5Nny4fc4uQvw',
        importMode: 'async'
      })
    ]
  },
  vue: {
    template: {
      compilerOptions: {
        // https://github.com/vuejs/vitepress/discussions/468
        isCustomElement: (tag) => {
          return ['center'].includes(tag.toLocaleLowerCase())
        },
      },
    },
  },
  lastUpdated: true,
  themeConfig: {
    outline: {
      level: [2, 3],
    },
    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: 'F919JCK8WY',
    //     apiKey: '3eca209ad24bdfc26db63382dd5e4490',
    //     indexName: 'sugarat_top',
    //     placeholder: '请输入要搜索的内容...'
    //   }
    // },
    lastUpdatedText: '上次更新于',
    // logo: 'https://sugarat.s3.bitiful.net/avatar/blog/zlyst-avatar.jpeg!style:avatar',
    logo: '/logo.png',
    editLink: {
      pattern:
        'https://github.com/cnjimbo/cnjimbo.github.io/tree/master/packages/blogpress/:path',
      text: '去 GitHub 上编辑内容',
    },
    nav: [
      {
        text: '关于我',
        link: '/aboutme',
      },
      {
        text: '六位代码',
        items: [
          { text: '精准爆头', link: '/stocks/PrecisionHeadshot/' },
          { text: '情绪核心', link: '/stocks/SentimentCore/' },
          // { text: '面经汇总', link: '/offer/sum-interview/' },
          // { text: '复习自查', link: '/offer/review/' },
        ],
      },
      {
        text: '笔记',
        items: [
          { text: '技术教程', link: '/technology/learn/' },
          { text: '模板工程', link: '/technology/tpl/' },
          { text: '源码学习', link: '/technology/source/' },
          { text: '技术概念', link: '/technology/theory/' },
          { text: '个人作品', link: '/technology/works/' },
          { text: '学习笔记', link: '/technology/study/' },
        ],
      },
      {
        text: '计算机基础',
        items: [
          { text: '算法与数据结构', link: '/computerBase/algorithm/' },
          { text: '操作系统', link: '/computerBase/os/' },
          { text: '计算机网络', link: '/computerBase/Internet/' },
          { text: '设计模式', link: '/computerBase/design/' },

          { text: '力扣', link: '/computerBase/leetcode/' }
        ],
      },
      {
        text: '大前端',
        items: [
          { text: 'javascript', link: '/bigWeb/js/' },
          { text: 'vue', link: '/bigWeb/vue/' },
          { text: 'html', link: '/bigWeb/html/' },
          { text: 'css', link: '/bigWeb/css/' },
          { text: '🌏浏览器专题', link: '/bigWeb/browser/' },
          { text: 'Web性能优化', link: '/bigWeb/performance/' },
          { text: 'regexp', link: '/bigWeb/regexp/' },
          { text: 'node', link: '/bigWeb/node/' },
        ],
      },
      {
        text: '不专业代码',
        items: [
          { text: 'github', link: '/coding/github/' },
        ],
      },
      {
        text: '面试',
        items: [

          // { text: 'javascript', link: '/coding/js/' },
          // { text: 'css', link: '/coding/css/' },
          // { text: '问解', link: '/interview/problem/' },
          // { text: 'javascript', link: '/interview/js/' },

          { text: '手撕代码', link: '/interview/code/' },
          { text: '性能优化', link: '/interview/performance/' },
          // { text: "网络", link: "/interview/internet/" },
          // { text: '操作系统', link: '/interview/os/' },
          // { text: '设计模式', link: '/interview/design/' },
          { text: '综合问题', link: '/interview/other/' },
          { text: '剑指offer', link: '/interview/offer/' },
          // { text: '面经汇总', link: '/offer/sum-interview/' },
          { text: '小程序', link: '/interview/mini/' },
        ],
      },
      // {
      //   text: '个人站点',
      //   items: [
      //     {
      //       text: 'GitHub',
      //       link: 'https://github.com/cnjimbo/cnjimbo.github.io'
      //     },
      //     {
      //       text: '博客园',
      //       link: 'https://www.cnblogs.com/roseAT/'
      //     },
      //     {
      //       text: '掘金',
      //       link: 'https://juejin.im/user/1028798615918983'
      //     }
      //     // {
      //     //   text: "GitBook-blog",
      //     //   link: "https://sugar-at.gitbook.io/blog-article/",
      //     //   icon: "reco-blog",
      //     // },
      //     // {
      //     //   text: "GitBook-ES6",
      //     //   link: "https://sugar-js.gitbook.io/-1/",
      //     //   icon: "reco-document",
      //     // },
      //   ]
      // },
      {
        text: '线上作品',
        items: [
          {
            text: 'POCO Mapper(dotnet)',
            link: 'https://github.com/netniubility/EmitMapper',
          },

        ],
      },
      {
        text: '周刊',
        link: '/weekly',

      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cnjimbo/cnjimbo.github.io' },
      {
        icon: 'x',
        link: 'https://x.com/cnJimbo',
      },
    ],
  },
})
