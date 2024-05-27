---
isTimeLine: true
date: 2020-12-13
tags:
 - 大前端
categories:
 - 其它
sticky: 7
---

# 【2020】我眼中的前端🧐

> 个人能力有限，大部分内容均站在个人角度思考，如有表述错误之处，还请斧正，避免误导新同学

## 写本文目的
* 为了帮助想学前端，或者正在学前端的学弟学妹，前端新人等 重新认识前端或者说是加深对**前端工程师**的认识
* 回答收集到的一些疑问

tips:本文中提到的FE（Front-End）均指前端

## 什么是前端开发

这里先引用[百度百科-前端开发](https://baike.baidu.com/item/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91)的介绍

>前端开发是创建Web页面或app等前端界面呈现给用户的过程，通过HTML，CSS及JavaScript以及衍生出来的各种技术、框架、解决方案，来实现互联网产品的用户界面交互

>从网页制作演变而来，名称上有很明显的时代特征。在互联网的演化进程中，网页制作是Web1.0时代的产物，早期网站主要内容都是静态，以图片和文字为主，用户使用网站的行为也以浏览为主。随着互联网技术的发展和HTML5、CSS3的应用，现代网页更加美观，交互效果显著，功能更加强大。

目前很多新同学和部分学校的老师对前端开发的认识还是停留在**Web1.0**时代

认为FE的工作就是写写网页（页面），认为没有什么难度，容易学习，能力很容易达到天花板

加之网上各种在线教育机构，铺天盖地的针对没有过多FE基础的同学的课程广告 （XX天入门前端，仿XX项目，XX天入门到精通）容易对新人产生误导

这是一种比较狭义的认识

**从广义上来讲，所有用户终端产品与`视觉`和`交互`有关的部分，都有前端工程师的身影，且前端工程师的职责不止于此**，后文会详细介绍

**终端指**
* PC
* 移动端：Android，IOS
* 嵌入式设备：Pos机，工作台，智能穿戴设备等

## 什么是Web前端工程师

字面上理解就是 主要掌握的Web开发相关技术的前端同学

而与Web相关的技术 就是 HTML,JS,CSS

由此大家就联想到 就是做网站的页面开发

在目前招聘中 Web前端工程师和前端工程师其实指的就是同一个岗位

## 工作就只是写写页面吗

前端只写网页页面的时代已经过去很久了

前面也提到了凡是在终端产品中的视觉与交互相关的工作都需要前端工程师 的参与

随着端上的硬件配置越来越高，性能越来越好，用户想要的功能就越来越多

前端的工作是直接影响用户体验的，PM（产品经理）也为了提升用户对产品的使用粘性，也会提出更多的用户体验上的要求，这些是光会写页面所解决不了的

为了丰富用户的体验，就需要丰富页面的交互，动画，提升用户粘性就是利用端上的游戏

**例如：**

年报（支付宝年度账单）里面的交互动画，数据报表，这里面就涉及到了 **数据可视化**，**复杂交互动画**等技术，各主流App中的内置,果园游戏,种树游戏,每年双十一的淘宝**游戏**活动等，这些都是需要前端工程师的工作内容

## 快速发展的前端

![图片](https://img.cdn.sugarat.top/mdImg/MTYwNzgyODkyNTU2OA==607828925568)

在Web1.0时代掌握 HTML,JS,CSS 即可

但现代Web开发强调**工程化**，所需要掌握的内容远不止于此，尤其是JS现在已经算是前端的顶梁柱

由此诞生了一句名言：

>任何可以用 JavaScript 来写的应用，最终都将用 JavaScript 来写

## 我们能做什么
除了普通的页面编写，前端**工程师** 还有很多能做的事情...

### 面向普通用户
* PC：PC网页，桌面应用
* 移动端：H5应用，手机App，小程序
* 互动交互
  * 游戏：比如支付宝（蚂蚁庄园，蚂蚁森林），淘宝（每年双十一的游戏活动页），各种App中的果园游戏，常见于活动页的交互游戏
  * 动画：用户看见的一些有趣的动画
  * 交互：组件/页面维度之间的交互动画
* 数据可视化：用户常见的数据图表

### 面向开发者
* 工程化
  * 流程规范工具
  * 度量监控系统：日志收集，错误上报，页面监控，数据分析，水印服务等
  * 构建工具：基于现有的构建工具进行定制化
  * 研发框架：针对特定业务场景框架，基于已有的开源框架进行定制化的框架
  * CLI：脚手架工具
  * 组件：UI组件，业务组件，图形组件
  * 测试：UI自动化测试工具
  * CI/CD：持续集成与持续交付平台搭建，云构建平台
* 性能优化
* Node.js
  * Node中间件
  * 服务端开发框架
  * 各种自动化工具
* 跨端技术：一套代码，多端复用的框架
  * 小程序跨端：微信，QQ,支付宝，百度，字节跳动，快应用等等小程序
  * 移动端跨端：IOS,Android
  * PC端跨端：windows，Linux，MacOS
* 可视化技术：将数据转化成为交互的图形或图像
  * 数据报表
  * 地理信息可视化
  * 数据图表
* 搭建服务平台：通过拖拽，结合少量配置的方式生成完整的页面技术
* 智能化平台：通过AI机器学习，实现直接通过设计原件 生成页面代码，并保证代码的高质量

## 如何成为合格的初级FE
**个人观点**

### 1. 具备一定的HTML,CSS基础
* 能完成对UI设计稿的还原
* 能完成一些简单的交互动画

### 2. 扎实的JS基础
js是FE书写最多的内容，很多框架技术,工具等也由JS书写，即最终都脱离不了JS

* 熟悉ES5,ES6的语法
* 了解BOM/DOM API: 至少了解这些API提供了哪些能力，不一定要记住API如何使用
* 熟悉一门现代Web框架（Vue,React,Angular）的使用,并了解其一些核心的原理

### 3. 工程化能力
* 了解如何使用构建工具
* 了解如何调试自己的应用

### 4. 项目能力
* 能够部署自己的web应用
* 会使用一种数据库
* 具备一定的服务端开发能力

### 其它
* 能够持续学习
* 不排斥新技术

## 总结
前端目前正在迅猛发展，未来的前景也是一片大好

随着硬件技术的迭代，会出现更多的应用场景，FE的工作还是非常具有挑战性的

行业缺的是 **工程师**，而不是 **UI还原师**

## QA
### 1. 前端的主要工作，以及前端的好处及坏处
前端工程师的主要工作上面已经做了详细的介绍

好处，emmm，在我看来
* 工作绝对是有挑战性，能挖掘自己的潜力，让自己持续不断的学习进步
* 随着企业纷纷开辟线上的场地，是非常缺**前端工程师**的，即好就业
* 技术产物是最接近用户的，能够获得极大的成就感

坏处，我客观的说几个
* 技术更新比较快，需要持续不断的学习
* 技术种类比较繁多，容易劝退刚会一点，没有人指导方向的初学者
* 容易原地踏步

### 2. 前端如何入门，前端学习的阶段（学习步骤）
#### 阶段一：页面还原
1. 了解CSS，HTML的基本语法，熟悉常用属性的编写
2. 达到能对常见的页面(不包含复杂动画与交互)进行1:1的静态还原

学习资料：
* [菜鸟教程](https://www.runoob.com/)我一直觉得是个不错的入门学习的网站
  * [HTML部分内容](https://www.runoob.com/html/html-tutorial.html)
  * [CSS部分内容](https://www.runoob.com/css/css-tutorial.html)

学习过程主要是**了解其所拥有的能力**，而不是刻意去记住xx属性怎么拼写，有什么作用

在大致了解起基本能力后可以试着看几个综合案例的实现
* [简单页面](https://www.runoob.com/w3cnote/htmlcss-make-a-website.html)
* 去[学习网站](https://www.bilibili.com/)找个复杂的案例跟一遍
  * 这里随便找了个[案例](https://www.bilibili.com/video/BV1yE411D77E?p=1)

在看视频学习时，当遇到素材问题时，可**不必与教程一模一样**，我们的目的是学习这个过程，在实现上可以有**自己的思考**,素材可根据自己喜好替换或者留白

#### 阶段二: 赋予页面活力
1. 了解JS的基本用法，能简单的对页面进行控制

学习资料：
* [JavaScript 教程](https://www.runoob.com/js/js-tutorial.html)
* [Js Dom](https://www.runoob.com/js/js-htmldom.html)

资料始终是作为辅助学习**工具**，初学过程得自己判断章节的取舍，而不是按照目录 挨着挨着学

在**了解基本语法后**就可去学习网站上找一个 结合了js的综合案例

当能通过查阅资料来完成自己页面想法的时候，差不多就算入门了

#### 阶段三：趁热打铁
1. 在学会了使用 传统的“三剑客”开发页面后，接着体验一下现代的开发框架开发

此时针对JS基础薄弱的同学，推荐**Vue.js入门**，如果觉得自己的JS还不错可以考虑 **React.js**

这两个都是js的框架，本质上也是js,即由js的基础能力构成的一个拥有完备工程开发能力的工具

* [Vue](https://cn.vuejs.org/index.html)
* [React](https://zh-hans.reactjs.org/)

如果不习惯看官方文档的学习方式，可自行网上找其它的学习资料，相信此时的你已经拥有自己的一套方法搜寻资料

不过最终还是会回到学习文档这里来

#### 阶段四：返璞归真
* 此时的你应该已经具备开发一个普通项目/页面的能力了

此时就需要重新系统的弥补自己的基础能力（JS为主,CSS为次要）,相信二次的学习，会有很大的收获，过程中会产生一些**顿悟**

javascript:
* [ES5](https://wangdoc.com/javascript/)
* [ES6](https://wangdoc.com/es6/)

css:
* [css3的新能力](https://www.runoob.com/css3/css3-tutorial.html)
* [弹性布局:flex](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
* [栅栏布局:grid](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
* 响应式布局

#### 阶段五：无尽的探索
此时你已经是具备一定的实战经验，拥有扎实的基础知识支撑：

可以在后文列举的 开发技术中 探索自己感兴趣的内容

又或者不满足于只能实现静态网页，可以学习一些后端的技术（最低成本基于Node.js的后端能力）

后面的路，自己去探索是最好的，去寻找自己感兴趣的方向，先广度，后深入探寻

### 3. 前端学习有什么需要注意的吗
1. **重视基础内容，尤其js**，会的不在多，在于精
2. 切勿急于求成，觉得自己**能随心所欲的写出一个页面**就沾沾自喜，能够完成学校的项目，觉得自己找工作就没问题了
3. 不骄不躁，脚踏实地的学习

### 4. 前端学习进入大厂的方式
>了解：听说过这个概念，知道是干什么的

>熟悉：能快速地利用这个技术构建一个可用的应用

>精通：读过源码，了解其原理，可对其修改以满足某些特殊需求

* 扎实的前端技术
  * 熟练掌握js，css，html
  * 具备一定的实战项目开发经验
  * 对框架（Vue/React）的原理有一定了解，能复现或者清楚的描述出来
  * 对前端工程化有自己的理解和实战经验
  * 一些额外的开发能力（能够描述清楚技术的原理）
    * xx插件
    * 小程序
    * 桌面应用
    * 移动App
    * 跨端开发技术
    * ...
* 扎实的计算机基础知识（前端同学考察比较浅，但一定会考，**切勿轻视**）
  * 操作系统
  * 算法与数据结构
  * 计算机网络
  * 设计模式
* 加分项（我认为）
  * 有一定的后端开发能力
    * 服务端开发经验
    * 数据库
  * 多人协作项目的开发
  * 熟悉Git
  * 了解Linux的基本用法
  * 会部署自己的前端工程
  * 自己的个人博客
  * 实习经验

校招考点在[这里](./../top/campusProblem.md)也做了总结

### 5. 前端学习如何可以快速做出一个项目（学什么）
希望快速得到结果：

了解一下**html,css**怎么用如何书写,通过查阅资料,就可以开发一个简单的页面

如果希望丰富页面的交互，**了解js的简单语法**，根据自己想要的查一下**BOM，DOM API**

能够通过查阅资料 写出代码（自己能懂每一行是什么意思）实现自己的项目，我觉得就算入门了

后续快速开发（JS基础薄弱的话）就可以学Vue框架（🍬）有时间的话，一周看完一个实践教程不成问题，过程中肯定会遇到很多 不解的东西，此时就需要记下来，下来去查资料，然后消化吸收，差不多1-2个实战教程后，就算框架入门了，自己也能更快速的实现自己想要的东西

接下来就需要回过头去 认真看一下JS
### 6. 做一个桌面小程序或者微信小程序需要学习什么除了三件套之外
小程序厂商约束了开发的规范，阉割了一些 **“三剑客”** 的能力，实际开发 还是运用的这三者，只是换了一些概念

即学习成本只有：**熟悉特定厂商的开发规范文档，与开发工具（IDE）的使用**

如果不知如何入手，看文档看不懂，就推荐找一门小程序的实战课程看一下

如果想同时开发一个能在多个平台上线的小程序，推荐去学习一个跨端开发框架，后文有介绍

如果做 **桌面应用的话**，学习[Electron](https://www.electronjs.org/)框架即可，所使用到的技术依旧是
**三剑客**，只是需要遵循框架的开发规范

### 7. 进入大厂除了必要的前端知识，还需要什么知识。比如后端，数据库之类的需要吗
* 计算机基础知识
* 有一定的实战项目经验
* Git
* 关于后端技术
  * 非必须，但技多不压身，你会别人不会 这就是你的优势，我相信你也不满足于只写静态页面
  * 数据库：非关系数据库，关系数据库 会使用一个

### 8. 进入大厂需要准备什么以前端来说，比如项目，或者奖，是必要的吗
* 项目是**一定需要的**
  * 在筛选简历环节环节，除了学校和你的能力基本介绍信息之外，就是看你简历上的项目，来判断你的实际开发能力，**如果简历上一个项目都没有，那你简历上还剩什么？**
* 奖：非必须
  * ACM此类知名的算法大赛获奖是含金量最高的，其它的程序设计比赛或者项目竞赛奖我觉得至少需要**省一及以上**

### 9. 关于目前开发框架现状
* 曾经流行: JQuery,UI库（Bootstrap,Layui）,requirejs(模块化方案)
* 现在流行: 组件化开发，Vue，React
### 10. 与前端开发相关技术有哪些
* 平台相关
  * 桌面应用：Electron
  * 跨端开发：Native，React Native，Cordova, Weex，uni-app，Rax（阿里），Taro（京东），Chameleon（滴滴），Hippy（腾讯）等 --- 百花齐放
    * 一端开发多端复用：代码复用
    * 端指：web,ios,Android,小程序等
  * web：Vue，React，Angular
* 强类型支持：TypeScript
* 构建工具：Webpack，Gulp，Grunt
* 服务端：Node.js -> express,koa,egg 等
* css预编译：SASS、Less、Stylus

以上只是对一些前端技术做了一些列举，并不全面，来说明现在**前端繁荣的生态**，下面专门做了一些详细的列举

## 前端相关开发技术列举
### 1. Web开发
**开发框架**
* [Vue](https://cn.vuejs.org/https://cn.vuejs.org/)
* [React](https://react.docschina.org/)
* [Angular](https://angular.cn/)

**UI组件库**
* Vue: [ElementUI](https://element.eleme.cn/),[iView](http://iview.talkingdata.com/#/),[Cube UI](https://didi.github.io/cube-ui/#/zh-CN)，[Vant](https://youzan.github.io/vant/#/zh-CN/),[vuetify](https://vuetifyjs.com/en/)，[Ant design](https://www.antdv.com/docs/vue/introduce-cn/)
* React: [Ant design](https://ant-design.gitee.io/docs/react/introduce-cn)，[MATERIAL-UI](https://material-ui.com/zh/),[Chakra UI](https://chakra-ui.com/)

### 2. 跨端开发
一套代码，多端复用

**桌面应用**
* [Electron](https://www.electronjs.org/)
* [Flutter](https://flutter.dev/) 

**移动应用**
|                               框架名称                                |  IOS  | Android | 小程序 |  Web  |
| :-------------------------------------------------------------------: | :---: | :-----: | :----: | :---: |
|                [React Native](https://reactnative.cn/)                |   ✅   |    ✅    |   ❌    |   ✅   |
|                 [Cordova](http://cordova.axuer.com/)                  |   ✅   |    ✅    |   ❌    |   ❌   |
|                 [uni-app](https://uniapp.dcloud.io/)                  |   ✅   |    ✅    |   ✅    |   ✅   |
|                  [Weex](https://weex.apache.org/zh/)                  |   ✅   |    ✅    |   ❌    |   ❌   |
|                      [Rax](https://rax.js.org/)                       |   ❌   |    ❌    |   ✅    |   ✅   |
|           [Taro](https://nervjs.github.io/taro/docs/README)           |   ❌   |    ❌    |   ✅    |   ✅   |
|                   [Chameleon](http://cml.didi.cn/)                    |   ❌   |    ❌    |   ✅    |   ✅   |
| [Hippy](https://github.com/Tencent/Hippy/blob/master/README.zh_CN.md) |   ✅   |    ✅    |   ❌    |   ✅   |
|                    [Flutter](https://flutter.dev/)                    |   ✅   |    ✅    |   ❌    |   ✅   |

### 3. 游戏引擎
* [egret-白鹭引擎](https://www.egret.com/)
* [LayaAir](https://www.layabox.com/)
* [phaser](http://phaser.io/)
* [Hilo](http://hiloteam.github.io/index.html)

### 4. 服务端开发-[Node.js](https://nodejs.org/zh-cn/)
* [Express](https://expressjs.com/)
* [koa](https://koajs.com/)
* [Nest](https://nestjs.com/)
* [egg](https://eggjs.org/zh-cn/)

### 5. 数据可视化
* 相关技术：[SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG),[Web GL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API),[Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
* 可视化库：[echarts](https://echarts.apache.org/zh/index.html),[antv](https://antv.vision/),[Chart.js](https://www.chartjs.org/),[VICTORY](https://formidable.com/open-source/victory/)...

### 6. 构建工具
* [webpack](https://www.webpackjs.com/)
* [glup](https://www.gulpjs.com.cn/)
* [grunt](https://www.gruntjs.net/)

### 7. 工程化中使用工具
* [Babel](https://www.babeljs.cn/)
* [Eslint](https://cn.eslint.org/)

### 8. 度量监控
* [frontjs](https://www.frontjs.com/)
* [fundebug](https://www.fundebug.com/)
* [百度统计](https://tongji.baidu.com/web/welcome/login)
* [Google Analytics](https://marketingplatform.google.com/about/)
* [CNZZ](https://www.umeng.com/web)

### 9. 智能化
* [imgcook](https://www.imgcook.com/)
* [pipcook](https://alibaba.github.io/pipcook/#/zh-cn/)
* [TensorFlow.js](https://www.tensorflow.org/js?hl=zh-cn)

### 其它
* [TypeScript](https://www.tslang.cn/)
* ...

TODO: 补充一张前端技术的思维导图

## 参考资料
* [语雀-分享狼叔关于《大前端工程化的实践与思考》](https://www.yuque.com/robinson/fe-pro/gu001d)

