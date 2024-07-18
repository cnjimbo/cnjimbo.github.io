"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/node.ts
var node_exports = {};
__export(node_exports, {
  defineConfig: () => defineConfig,
  footerHTML: () => footerHTML,
  getThemeConfig: () => getThemeConfig,
  tabsMarkdownPlugin: () => tabsPlugin
});
module.exports = __toCommonJS(node_exports);

// src/utils/node/mdPlugins.ts
var import_module = require("module");

// ../../node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.3.0_@algolia+client-search@4.24.0_@types+node@20.14.1_l2edka3dg3ibxaau4olbp5o37m/node_modules/vitepress-plugin-tabs/dist/index.js
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_markdown_it_container = __commonJS({
  "../../node_modules/.pnpm/markdown-it-container@3.0.0/node_modules/markdown-it-container/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function container_plugin(md, name, options) {
      function validateDefault(params) {
        return params.trim().split(" ", 2)[0] === name;
      }
      function renderDefault(tokens, idx, _options, env, slf) {
        if (tokens[idx].nesting === 1) {
          tokens[idx].attrJoin("class", name);
        }
        return slf.renderToken(tokens, idx, _options, env, slf);
      }
      options = options || {};
      var min_markers = 3, marker_str = options.marker || ":", marker_char = marker_str.charCodeAt(0), marker_len = marker_str.length, validate = options.validate || validateDefault, render = options.render || renderDefault;
      function container2(state, startLine, endLine, silent) {
        var pos, nextLine, marker_count, markup, params, token, old_parent, old_line_max, auto_closed = false, start = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
        if (marker_char !== state.src.charCodeAt(start)) {
          return false;
        }
        for (pos = start + 1; pos <= max; pos++) {
          if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
            break;
          }
        }
        marker_count = Math.floor((pos - start) / marker_len);
        if (marker_count < min_markers) {
          return false;
        }
        pos -= (pos - start) % marker_len;
        markup = state.src.slice(start, pos);
        params = state.src.slice(pos, max);
        if (!validate(params, markup)) {
          return false;
        }
        if (silent) {
          return true;
        }
        nextLine = startLine;
        for (; ; ) {
          nextLine++;
          if (nextLine >= endLine) {
            break;
          }
          start = state.bMarks[nextLine] + state.tShift[nextLine];
          max = state.eMarks[nextLine];
          if (start < max && state.sCount[nextLine] < state.blkIndent) {
            break;
          }
          if (marker_char !== state.src.charCodeAt(start)) {
            continue;
          }
          if (state.sCount[nextLine] - state.blkIndent >= 4) {
            continue;
          }
          for (pos = start + 1; pos <= max; pos++) {
            if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
              break;
            }
          }
          if (Math.floor((pos - start) / marker_len) < marker_count) {
            continue;
          }
          pos -= (pos - start) % marker_len;
          pos = state.skipSpaces(pos);
          if (pos < max) {
            continue;
          }
          auto_closed = true;
          break;
        }
        old_parent = state.parentType;
        old_line_max = state.lineMax;
        state.parentType = "container";
        state.lineMax = nextLine;
        token = state.push("container_" + name + "_open", "div", 1);
        token.markup = markup;
        token.block = true;
        token.info = params;
        token.map = [startLine, nextLine];
        state.md.block.tokenize(state, startLine + 1, nextLine);
        token = state.push("container_" + name + "_close", "div", -1);
        token.markup = state.src.slice(start, pos);
        token.block = true;
        state.parentType = old_parent;
        state.lineMax = old_line_max;
        state.line = nextLine + (auto_closed ? 1 : 0);
        return true;
      }
      md.block.ruler.before("fence", "container_" + name, container2, {
        alt: ["paragraph", "reference", "blockquote", "list"]
      });
      md.renderer.rules["container_" + name + "_open"] = render;
      md.renderer.rules["container_" + name + "_close"] = render;
    };
  }
});
var import_markdown_it_container = __toESM2(require_markdown_it_container(), 1);
var tabMarker = "=";
var tabMarkerCode = tabMarker.charCodeAt(0);
var minTabMarkerLen = 2;
var ruleBlockTab = (state, startLine, endLine, silent) => {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];
  if (state.parentType !== "container") {
    return false;
  }
  if (pos + minTabMarkerLen > max) {
    return false;
  }
  const marker = state.src.charCodeAt(pos);
  if (marker !== tabMarkerCode) {
    return false;
  }
  const mem = pos;
  pos = state.skipChars(pos + 1, marker);
  const tabMarkerLen = pos - mem;
  if (tabMarkerLen < minTabMarkerLen - 1) {
    return false;
  }
  if (silent) {
    return true;
  }
  let nextLine = startLine;
  let endStart = mem;
  let endPos = pos;
  for (; ; ) {
    nextLine++;
    if (nextLine >= endLine) {
      break;
    }
    endStart = state.bMarks[nextLine] + state.tShift[nextLine];
    const max2 = state.eMarks[nextLine];
    if (endStart < max2 && state.sCount[nextLine] < state.blkIndent) {
      break;
    }
    const startCharCode = state.src.charCodeAt(endStart);
    if (startCharCode !== tabMarkerCode) {
      continue;
    }
    const p = state.skipChars(endStart + 1, marker);
    if (p - endStart !== tabMarkerLen) {
      continue;
    }
    endPos = p;
    break;
  }
  const oldParent = state.parentType;
  const oldLineMax = state.lineMax;
  state.parentType = "tab";
  state.lineMax = nextLine;
  const startToken = state.push("tab_open", "div", 1);
  startToken.markup = state.src.slice(mem, pos);
  startToken.block = true;
  startToken.info = state.src.slice(pos, max).trimStart();
  startToken.map = [startLine, nextLine - 1];
  state.md.block.tokenize(state, startLine + 1, nextLine);
  const endToken = state.push("tab_close", "div", -1);
  endToken.markup = state.src.slice(endStart, endPos);
  endToken.block = true;
  state.parentType = oldParent;
  state.lineMax = oldLineMax;
  state.line = nextLine;
  return true;
};
var parseTabsParams = (input) => {
  const match = input.match(/key:(\S+)/);
  return {
    shareStateKey: match == null ? void 0 : match[1]
  };
};
var tabsPlugin = (md) => {
  md.use(import_markdown_it_container.default, "tabs", {
    render(tokens, index) {
      const token = tokens[index];
      if (token.nesting === 1) {
        const params = parseTabsParams(token.info);
        const shareStateKeyProp = params.shareStateKey ? `sharedStateKey="${md.utils.escapeHtml(params.shareStateKey)}"` : "";
        return `<PluginTabs ${shareStateKeyProp}>
`;
      } else {
        return `</PluginTabs>
`;
      }
    }
  });
  md.block.ruler.after("container_tabs", "tab", ruleBlockTab);
  const renderTab = (tokens, index) => {
    const token = tokens[index];
    if (token.nesting === 1) {
      const label = token.info;
      const labelProp = `label="${md.utils.escapeHtml(label)}"`;
      return `<PluginTabsTab ${labelProp}>
`;
    } else {
      return `</PluginTabsTab>
`;
    }
  };
  md.renderer.rules["tab_open"] = renderTab;
  md.renderer.rules["tab_close"] = renderTab;
};

// src/utils/node/mdPlugins.ts
var import_vitepress_markdown_timeline = __toESM(require("vitepress-markdown-timeline"));

// src/utils/node/index.ts
var import_node_path = __toESM(require("path"));
var import_theme_shared = require("@sugarat/theme-shared");
function aliasObjectToArray(obj) {
  return Object.entries(obj).map(([find, replacement]) => ({
    find,
    replacement
  }));
}
function isBase64ImageURL(url) {
  const regex = /^data:image\/[a-z]+;base64,/;
  return regex.test(url);
}
var imageRegex = /!\[.*?\]\((.*?)\s*(".*?")?\)/;
function getFirstImagURLFromMD(content, route) {
  const url = content.match(imageRegex)?.[1];
  const isHTTPSource = url && url.startsWith("http");
  if (!url) {
    return "";
  }
  if (isHTTPSource || isBase64ImageURL(url)) {
    return url;
  }
  const paths = (0, import_theme_shared.joinPath)("/", route).split("/");
  paths.splice(paths.length - 1, 1);
  const relativePath = url.startsWith("/") ? url : import_node_path.default.join(paths.join("/") || "", url);
  return (0, import_theme_shared.joinPath)("/", relativePath);
}
function debounce(func, delay = 1e3) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...rest);
    }, delay);
  };
}
function isEqual(obj1, obj2, excludeKeys = []) {
  const keys1 = Object.keys(obj1).filter((key) => !excludeKeys.includes(key));
  const keys2 = Object.keys(obj2).filter((key) => !excludeKeys.includes(key));
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !isEqual(val1, val2, excludeKeys) || !areObjects && val1 !== val2) {
      return false;
    }
  }
  return true;
}
function isObject(obj) {
  return obj != null && typeof obj === "object";
}

// src/utils/node/mdPlugins.ts
var import_meta = {};
function _require(module2) {
  return (typeof import_meta?.url !== "undefined" ? (0, import_module.createRequire)(import_meta.url) : require)(module2);
}
function getMarkdownPlugins(cfg) {
  const markdownPlugin = [];
  if (cfg?.tabs !== false) {
    markdownPlugin.push(tabsPlugin);
  }
  if (cfg?.mermaid !== false) {
    const { MermaidMarkdown } = _require("vitepress-plugin-mermaid");
    markdownPlugin.push(MermaidMarkdown);
  }
  if (cfg?.taskCheckbox !== false) {
    markdownPlugin.push(taskCheckboxPlugin(typeof cfg?.taskCheckbox === "boolean" ? {} : cfg?.taskCheckbox));
  }
  if (cfg?.timeline !== false) {
    markdownPlugin.push(import_vitepress_markdown_timeline.default);
  }
  return markdownPlugin;
}
function taskCheckboxPlugin(ops) {
  return (md) => {
    md.use(_require("markdown-it-task-checkbox"), ops);
  };
}
function registerMdPlugins(vpCfg, plugins) {
  if (plugins.length) {
    vpCfg.markdown = {
      config(...rest) {
        plugins.forEach((plugin) => {
          plugin?.(...rest);
        });
      }
    };
  }
}
function patchMermaidPluginCfg(config) {
  if (!config.vite.resolve)
    config.vite.resolve = {};
  if (!config.vite.resolve.alias)
    config.vite.resolve.alias = {};
  config.vite.resolve.alias = [
    ...aliasObjectToArray({
      ...config.vite.resolve.alias,
      "cytoscape/dist/cytoscape.umd.js": "cytoscape/dist/cytoscape.esm.js",
      "mermaid": "mermaid/dist/mermaid.esm.mjs"
    }),
    { find: /^dayjs\/(.*).js/, replacement: "dayjs/esm/$1" }
  ];
}
function patchOptimizeDeps(config) {
  if (!config.vite.optimizeDeps) {
    config.vite.optimizeDeps = {};
  }
  config.vite.optimizeDeps.exclude = ["vitepress-plugin-tabs", "@sugarat/theme"];
  config.vite.optimizeDeps.include = ["element-plus"];
}

// src/utils/node/theme.ts
var import_node_fs = __toESM(require("fs"));
var import_node_path2 = __toESM(require("path"));
var import_node_process = __toESM(require("process"));
var import_fast_glob = __toESM(require("fast-glob"));
var import_theme_shared2 = require("@sugarat/theme-shared");

// src/utils/client/index.ts
function formatDate(d, fmt = "yyyy-MM-dd hh:mm:ss") {
  if (!(d instanceof Date)) {
    d = new Date(d);
  }
  const o = {
    "M+": d.getMonth() + 1,
    // 月份
    "d+": d.getDate(),
    // 日
    "h+": d.getHours(),
    // 小时
    "m+": d.getMinutes(),
    // 分
    "s+": d.getSeconds(),
    // 秒
    "q+": Math.floor((d.getMonth() + 3) / 3),
    // 季度
    "S": d.getMilliseconds()
    // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${d.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
  }
  return fmt;
}

// src/utils/node/theme.ts
function patchDefaultThemeSideBar(cfg) {
  return cfg?.blog !== false && cfg?.recommend !== false ? {
    sidebar: [
      {
        text: "",
        items: []
      }
    ]
  } : void 0;
}
function getPageRoute(filepath, srcDir) {
  const route = (0, import_theme_shared2.normalizePath)(import_node_path2.default.relative(srcDir, filepath)).replace(/\.md$/, "");
  return `/${route}`;
}
var defaultTimeZoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset() / -60;
async function getArticleMeta(filepath, route, timeZone = defaultTimeZoneOffset) {
  const fileContent = await import_node_fs.default.promises.readFile(filepath, "utf-8");
  const { data: frontmatter, excerpt, content } = (0, import_theme_shared2.grayMatter)(fileContent, {
    excerpt: true
  });
  const meta = {
    ...frontmatter
  };
  if (!meta.title) {
    meta.title = (0, import_theme_shared2.getDefaultTitle)(content);
  }
  const date = await (meta.date && /* @__PURE__ */ new Date(`${new Date(meta.date).toUTCString()}+${timeZone}`) || (0, import_theme_shared2.getFileLastModifyTime)(filepath));
  meta.date = formatDate(date || /* @__PURE__ */ new Date());
  meta.categories = typeof meta.categories === "string" ? [meta.categories] : meta.categories;
  meta.tags = typeof meta.tags === "string" ? [meta.tags] : meta.tags;
  meta.tag = [meta.tag || []].flat().concat([
    .../* @__PURE__ */ new Set([...meta.categories || [], ...meta.tags || []])
  ]);
  meta.description = meta.description || (0, import_theme_shared2.getTextSummary)(content, 100) || excerpt;
  meta.cover = meta.cover ?? getFirstImagURLFromMD(fileContent, route);
  if (meta.publish === false) {
    meta.hidden = true;
    meta.recommend = false;
  }
  return meta;
}
async function getArticles(cfg, vpConfig) {
  const srcDir = cfg?.srcDir || vpConfig.srcDir.replace(vpConfig.root, "").replace(/^\//, "") || import_node_process.default.argv.slice(2)?.[1] || ".";
  const files = import_fast_glob.default.sync(`${srcDir}/**/*.md`, { ignore: ["node_modules"], absolute: true });
  const metaResults = files.reduce((prev, curr) => {
    const route = getPageRoute(curr, vpConfig.srcDir);
    const metaPromise = getArticleMeta(curr, route, cfg?.timeZone);
    prev[curr] = {
      route,
      metaPromise
    };
    return prev;
  }, {});
  const pageData = [];
  for (const file of files) {
    const { route, metaPromise } = metaResults[file];
    const meta = await metaPromise;
    if (meta.layout === "home") {
      continue;
    }
    pageData.push({
      route,
      meta
    });
  }
  return pageData;
}
function patchVPConfig(vpConfig, cfg) {
  vpConfig.head = vpConfig.head || [];
  if (cfg?.comment && "type" in cfg.comment && cfg?.comment?.type === "artalk") {
    const server = cfg.comment?.options?.server;
    if (server) {
      vpConfig.head.push(["link", { href: `${server}/dist/Artalk.css`, rel: "stylesheet" }]);
      vpConfig.head.push(["script", { src: `${server}/dist/Artalk.js`, id: "artalk-script" }]);
    }
  }
}
function patchVPThemeConfig(cfg, vpThemeConfig = {}) {
  vpThemeConfig.sidebar = patchDefaultThemeSideBar(cfg)?.sidebar;
  return vpThemeConfig;
}
function checkConfig(cfg) {
}

// src/utils/node/vitePlugins.ts
var import_node_path3 = __toESM(require("path"));
var import_node_fs2 = require("fs");
var import_node_buffer = require("buffer");
var import_vitepress_plugin_pagefind = require("vitepress-plugin-pagefind");
var import_vitepress_plugin_rss = require("vitepress-plugin-rss");
var import_theme_shared3 = require("@sugarat/theme-shared");

// src/utils/node/hot-reload-plugin.ts
function themeReloadPlugin() {
  let blogConfig;
  let vitepressConfig;
  let docsDir;
  const generateRoute = (filepath) => {
    return filepath.replace(docsDir, "").replace(".md", "");
  };
  return {
    name: "@sugarat/theme-reload",
    apply: "serve",
    configureServer(server) {
      const restart = debounce(() => {
        server.restart();
      }, 500);
      server.watcher.on("add", async (path4) => {
        const route = generateRoute(path4);
        const meta = await getArticleMeta(path4, route, blogConfig?.timeZone);
        blogConfig.pagesData.push({
          route,
          meta
        });
        restart();
      });
      server.watcher.on("change", async (path4) => {
        const route = generateRoute(path4);
        const meta = await getArticleMeta(path4, route, blogConfig?.timeZone);
        const matched = blogConfig.pagesData.find((v) => v.route === route);
        if (matched && !isEqual(matched.meta, meta, ["date", "description"])) {
          matched.meta = meta;
          restart();
        }
      });
      server.watcher.on("unlink", (path4) => {
        const route = generateRoute(path4);
        const idx = blogConfig.pagesData.findIndex((v) => v.route === route);
        if (idx >= 0) {
          blogConfig.pagesData.splice(idx, 1);
          restart();
        }
      });
    },
    configResolved(config) {
      vitepressConfig = config.vitepress;
      docsDir = vitepressConfig.srcDir;
      blogConfig = config.vitepress.site.themeConfig.blog;
    }
  };
}

// src/utils/node/vitePlugins.ts
function getVitePlugins(cfg = {}) {
  const plugins = [];
  plugins.push(coverImgTransform());
  if (cfg.themeColor) {
    plugins.push(setThemeScript(cfg.themeColor));
  }
  plugins.push(themeReloadPlugin());
  plugins.push(providePageData(cfg));
  if (cfg && cfg.search !== false) {
    const ops = cfg.search instanceof Object ? cfg.search : {};
    plugins.push(
      (0, import_vitepress_plugin_pagefind.pagefindPlugin)({
        ...ops
      })
    );
  }
  if (cfg?.mermaid !== false) {
    const { MermaidPlugin } = _require("vitepress-plugin-mermaid");
    plugins.push(inlineInjectMermaidClient());
    plugins.push(MermaidPlugin(cfg?.mermaid === true ? {} : cfg?.mermaid ?? {}));
  }
  if (cfg?.RSS) {
    ;
    [cfg?.RSS].flat().forEach((rssConfig) => plugins.push((0, import_vitepress_plugin_rss.RssPlugin)(rssConfig)));
  }
  return plugins;
}
function registerVitePlugins(vpCfg, plugins) {
  vpCfg.vite = {
    plugins
  };
}
function inlineInjectMermaidClient() {
  return {
    name: "@sugarat/theme-plugin-inline-inject-mermaid-client",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith("src/index.ts") && code.startsWith("// @sugarat/theme index")) {
        return code.replace("// replace-mermaid-import-code", "import Mermaid from 'vitepress-plugin-mermaid/Mermaid.vue'").replace("// replace-mermaid-mounted-code", "if (!ctx.app.component('Mermaid')) { ctx.app.component('Mermaid', Mermaid as any) }");
      }
      return code;
    }
  };
}
function coverImgTransform() {
  let blogConfig;
  let vitepressConfig;
  let assetsDir;
  return {
    name: "@sugarat/theme-plugin-cover-transform",
    apply: "build",
    enforce: "pre",
    configResolved(config) {
      vitepressConfig = config.vitepress;
      assetsDir = vitepressConfig.assetsDir;
      blogConfig = config.vitepress.site.themeConfig.blog;
    },
    async generateBundle(_, bundle) {
      const assetsMap = Object.entries(bundle).filter(([key]) => {
        return key.startsWith(assetsDir);
      }).map(([_2, value]) => {
        return value;
      });
      for (const page of blogConfig.pagesData) {
        const { cover } = page.meta;
        if (!cover?.startsWith?.("/")) {
          continue;
        }
        try {
          const realPath = import_node_path3.default.join(vitepressConfig.root, cover);
          if (!(0, import_node_fs2.existsSync)(realPath)) {
            continue;
          }
          const fileBuffer = (0, import_node_fs2.readFileSync)(realPath);
          const matchAsset = assetsMap.find((v) => import_node_buffer.Buffer.compare(fileBuffer, v.source) === 0);
          if (matchAsset) {
            page.meta.cover = (0, import_theme_shared3.joinPath)("/", matchAsset.fileName);
          }
        } catch (e) {
          vitepressConfig.logger.warn(e?.message);
        }
      }
    }
  };
}
function providePageData(cfg) {
  return {
    name: "@sugarat/theme-plugin-provide-page-data",
    async config(config) {
      const pagesData = await getArticles(cfg, config.vitepress);
      config.vitepress.site.themeConfig.blog.pagesData = pagesData;
    }
  };
}
function setThemeScript(themeColor) {
  let resolveConfig;
  const pluginOps = {
    name: "@sugarat/theme-plugin-theme-color-script",
    enforce: "pre",
    configResolved(config) {
      if (resolveConfig) {
        return;
      }
      resolveConfig = config;
      const vitepressConfig = config.vitepress;
      if (!vitepressConfig) {
        return;
      }
      const selfTransformHead = vitepressConfig.transformHead;
      vitepressConfig.transformHead = async (ctx) => {
        const selfHead = await Promise.resolve(selfTransformHead?.(ctx)) || [];
        return selfHead.concat([
          ["script", { type: "text/javascript" }, `;(function() {
            document.documentElement.setAttribute("theme", "${themeColor}");
          })()`]
        ]);
      };
    }
  };
  return pluginOps;
}

// src/node.ts
function getThemeConfig(cfg = {}) {
  checkConfig(cfg);
  cfg.mermaid = cfg.mermaid ?? false;
  const pagesData = [];
  const extraVPConfig = {
    vite: {}
  };
  const vitePlugins = getVitePlugins(cfg);
  registerVitePlugins(extraVPConfig, vitePlugins);
  const markdownPlugin = getMarkdownPlugins(cfg);
  registerMdPlugins(extraVPConfig, markdownPlugin);
  if (cfg?.mermaid !== false) {
    patchMermaidPluginCfg(extraVPConfig);
  }
  patchOptimizeDeps(extraVPConfig);
  patchVPConfig(extraVPConfig, cfg);
  return {
    themeConfig: {
      blog: {
        pagesData,
        ...cfg
      },
      // 补充一些额外的配置用于继承
      ...patchVPThemeConfig(cfg)
    },
    ...extraVPConfig
  };
}
function defineConfig(config) {
  return config;
}
function footerHTML(footerData) {
  const data = [footerData || []].flat();
  return data.map((d) => {
    const { icon, text, link } = d;
    return `<span class="footer-item">
    ${icon ? `<i>${icon}</i>` : ""}
    ${link ? `<a href="${link}" target="_blank" rel="noopener noreferrer">${text}</a>` : `<span>${text}</span>`}
</span>`;
  }).join("");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defineConfig,
  footerHTML,
  getThemeConfig,
  tabsMarkdownPlugin
});
