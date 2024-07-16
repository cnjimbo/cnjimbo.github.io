---
created: 2024-07-16T15:57:13 (UTC +08:00)
tags: [干货分享,🔥干货分享]
source: https://www.cnblogs.com/Megasu/p/15782353.html
author: Megasu
---

# 前端接口神器之 json-server 详细使用指南

---
## 简介

`json-server` 是一款小巧的接口模拟工具，一分钟内就能搭建一套 Restful 风格的 API，尤其适合前端接口测试使用。🔥🔥🔥
只需指定一个 `json` 文件作为 `api` 的数据源即可，使用起来非常方便，30 秒入门，基本上有手就行。👍
进阶操作还支持分页，排序等操作，简直强大。💪

### 开源地址

主页地址：[https://www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server)
Github项目地址：[https://github.com/typicode/json-server](https://github.com/typicode/json-server)

## 30秒入门

### 环境依赖

-   安装 Node.js 环境即可

### 操作步骤

1.  安装 JSON 服务器

```shell
npm install -g json-server
```

2.  创建一个`db.json`包含一些数据的文件

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

3.  启动 `json-server` 接口服务器

```shell
# 快速创建
json-server db.json

# 配置参数
json-server db.json --watch --port 3000
```

4.  浏览器访问 [http://localhost:3000/posts/1](http://localhost:3000/posts/1)，你会得到

```json
{ "id": 1, "title": "json-server", "author": "typicode" }
```

5.  🎉恭喜你，已经完成 `json-server` 快速搭建，熟练使用的话 30 秒即可完成服务器搭建⏰。

### 补充

-   如果您发出 POST、PUT、PATCH 或 DELETE 请求，更改将自动安全地保存到 `db.json` 文件中。

## 路由进阶

根据之前的`db.json`文件，这里是所有的默认路由。

### 路由形式一

```http
GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
PATCH  /posts/1
DELETE /posts/1
```

### 路由形式二

```http
GET    /profile
POST   /profile
PUT    /profile
PATCH  /profile
```

### 筛选

使用 `.` 访问筛选

```http
GET /posts?title=json-server&amp;author=typicode
GET /posts?id=1&amp;id=2
GET /comments?author.name=typicode
```

### 分页

使用`_page`和可选地`_limit`对返回的数据进行分页。

在`Link`标题，你会得到`first`，`prev`，`next`和`last`链接。

```http
GET /posts?_page=7
GET /posts?_page=7&amp;_limit=20
```

_默认返回10项_

### 排序

添加`_sort`和`_order`（默认升序）

```http
GET /posts?_sort=views&amp;_order=asc
GET /posts/1/comments?_sort=votes&amp;_order=asc
```

对于多个字段，请使用以下格式：

```http
GET /posts?_sort=user,views&amp;_order=desc,asc
```

### 切片(分页)

添加`_start`和`_end`或`_limit`

```http
GET /posts?_start=20&amp;_end=30
GET /posts/1/comments?_start=20&amp;_end=30
GET /posts/1/comments?_start=20&amp;_limit=10
```

__与[Array.slice](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)完全一样[工作](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)（即`_start`开始`_end`结束）__

### 特殊符号

添加`_gte`或`_lte`获取范围

```http
GET /posts?views_gte=10&amp;views_lte=20
```

添加`_ne`以排除值

```http
GET /posts?id_ne=1
```

添加`_like`到过滤器（支持正则表达式）

```http
GET /posts?title_like=server
```

### 全文搜索

添加 `q`

```http
GET /posts?q=internet
```

### 关系

要包含子资源，请添加 `_embed`

```http
GET /posts?_embed=comments
GET /posts/1?_embed=comments
```

要包含父资源，请添加 `_expand`

```http
GET /comments?_expand=post
GET /comments/1?_expand=post
```

获取或创建嵌套资源（默认为一级）

```http
GET  /posts/1/comments
POST /posts/1/comments
```

### 数据库

```http
GET /db
```

### 主页

返回默认索引文件或服务`./public`目录

```http
GET /
```

## 附加功能

### 静态文件服务器

您可以使用 JSON Server 为您的 HTML、JS 和 CSS 提供服务，只需创建一个`./public`目录或用于`--static`设置不同的静态文件目录。

```shell
mkdir public
echo 'hello world' > public/index.html
json-server db.json
```
```shell
json-server db.json --static ./some-other-dir
```

### 替换端口

您可以使用以下`--port`标志在其他端口上启动 `JSON Server` ：

```shell
$ json-server --watch db.json --port 3004
```

### 支持跨域

您可以使用 CORS 和 JSONP 从任何地方访问您模拟的 API 接口。

### 远程模式

您可以加载远程模式。

```shell
$ json-server http://example.com/file.json
$ json-server http://jsonplaceholder.typicode.com/db
```

### 生成随机数据

使用 JS 而不是 JSON 文件，您可以通过编程方式创建数据。

```js
// index.js
module.exports = () => {
  const data = { users: [] }
  // 创建 1000 个用户信息
  for (let i = 0; i < 1000; i++) {
    data.users.push({ id: i, name: `user${i}` })
  }
  return data
}
```
```shell
$ json-server index.js
```

**提示**：使用[Faker](https://github.com/Marak/faker.js)、[Casual](https://github.com/boo1ean/casual)、[Chance](https://github.com/victorquinn/chancejs)或[JSON Schema Faker 等模块](https://github.com/json-schema-faker/json-schema-faker)。

### 添加自定义路由

创建一个`routes.json`文件。注意每条路线都以`/`.

```json
{
  "/api/*": "/$1",
  "/:resource/:id/show": "/:resource/:id",
  "/posts/:category": "/posts?category=:category",
  "/articles\\?id=:id": "/posts/:id"
}
```

使用`--routes`选项启动 JSON 服务器。

```shell
json-server db.json --routes routes.json
```

现在您可以使用其他路线访问资源。

```http
/api/posts # → /posts
/api/posts/1  # → /posts/1
/posts/1/show # → /posts/1
/posts/javascript # → /posts?category=javascript
/articles?id=1 # → /posts/1
```

### 添加中间件

您可以使用以下`--middlewares`选项从 CLI 添加中间件：

```js
// hello.js
module.exports = (req, res, next) => {
  res.header('X-Hello', 'World')
  next()
}
```
```shell
json-server db.json --middlewares ./hello.js
json-server db.json --middlewares ./first.js ./second.js
```

### 命令行使用

```shell
json-server [options] <source>

Options:
  --config, -c       Path to config file           [default: "json-server.json"]
  --port, -p         Set port                                    [default: 3000]
  --host, -H         Set host                             [default: "localhost"]
  --watch, -w        Watch file(s)                                     [boolean]
  --routes, -r       Path to routes file
  --middlewares, -m  Paths to middleware files                           [array]
  --static, -s       Set static files directory
  --read-only, --ro  Allow only GET requests                           [boolean]
  --no-cors, --nc    Disable Cross-Origin Resource Sharing             [boolean]
  --no-gzip, --ng    Disable GZIP Content-Encoding                     [boolean]
  --snapshots, -S    Set snapshots directory                      [default: "."]
  --delay, -d        Add delay to responses (ms)
  --id, -i           Set database id property (e.g. _id)         [default: "id"]
  --foreignKeySuffix, --fks  Set foreign key suffix, (e.g. _id as in post_id)
                                                                 [default: "Id"]
  --quiet, -q        Suppress log messages from output                 [boolean]
  --help, -h         Show help                                         [boolean]
  --version, -v      Show version number                               [boolean]

Examples:
  json-server db.json
  json-server file.js
  json-server http://example.com/db.json

https://github.com/typicode/json-server
```

您还可以在`json-server.json`配置文件中设置选项。

```json
{
  "port": 3000
}
```

### 模块

如果您需要添加身份验证、验证或**任何行为**，您可以将项目作为模块与其他 Express 中间件结合使用。

#### 简单的例子

```shell
$ npm install json-server --save-dev
```
```js
// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
```
```shell
$ node server.js
```

您提供给`jsonServer.router`函数的路径是相对于您启动节点进程的目录的。如果从另一个目录运行上述代码，最好使用绝对路径：

```js
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
```

对于内存数据库，只需将对象传递给`jsonServer.router()`.

另请注意，`jsonServer.router()`它可用于现有的 Express 项目。

#### 自定义路由示例

假设您想要一个回显查询参数的路由和另一个在创建的每个资源上设置时间戳的路由。

```js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// 设置默认中间件（记录器、静态、cors 和无缓存）
server.use(middlewares)

// 写在自定义路由之前
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// 要处理 POST、PUT 和 PATCH，您需要使用 body-parser
// 您可以使用 JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // 继续到 JSON Server 路由器
  next()
})

// 使用默认路由器
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
```

#### 访问控制示例

```js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use((req, res, next) => {
  if (isAuthorized(req)) { // 在此处添加您的授权逻辑
    next() // 继续到 JSON Server 路由器
  }
  else {
    res.sendStatus(401)
  }
})
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
```

#### 自定义输出示例

要修改响应，请覆盖`router.render`方法：

```js
// 在这个例子中，返回的资源将被包装在一个 body 属性
router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data
  })
}
```

您可以为响应设置自己的状态代码：

```js
// 在这个例子中，我们模拟了一个服务器端错误响应
router.render = (req, res) => {
  res.status(500).jsonp({
    error: 'error message here'
  })
}
```

#### 重写器示例

要添加重写规则，请使用`jsonServer.rewriter()`：

```js
// 写在 server.use(router) 之前
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}))
```

#### 在另一个端点上挂载 JSON 服务器示例

或者，您也可以将路由器安装在`/api`.

```js
server.use('/api', router)
```

#### API

**`jsonServer.create()`**

返回一个 Express 服务器。

**`jsonServer.defaults([options])`**

返回 JSON 服务器使用的中间件。

-   选项
    -   `static` 静态文件的路径
    -   `logger` 启用记录器中间件（默认值：true）
    -   `bodyParser` 启用 body-parser 中间件（默认值：true）
    -   `noCors` 禁用 CORS（默认值：false）
    -   `readOnly` 只接受 GET 请求（默认值：false）

**`jsonServer.router([path|object])`**

返回 JSON 服务器路由器。

## 总结

1.  json-server 入门简单，30 秒出效果，零编码实现 REST API 风格接口，实属前端接口神器。👍👍👍
2.  路由进阶操作还支持分页，排序等操作，简直强大。💪
3.  感谢点赞与支持💕💕💕
