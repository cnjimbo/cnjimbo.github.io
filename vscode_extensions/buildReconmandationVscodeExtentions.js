"use strict";
// 使用code code runner 运行此脚本，生成推荐插件id列表。
// code runner需要 pnpm add -D ts-node
// 并且  需要设置code runner执行环境为
/*
"code-runner.executorMap": {
    "typescript": "node --es-module-specifier-resolution=node --loader ts-node/esm $fullFileName",
    "ts": "node --es-module-specifier-resolution=node --loader ts-node/esm $fullFileName",
    "javascript": "node  --es-module-specifier-resolution=node  $fullFileName",
  },

  */
// 最后将输出内容复制到code-workspace的对应位置
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// 定义一个异步函数来读取文件并解析为JSON
function readFileToJson(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var fileContent, jsonObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('x');
                    return [4 /*yield*/, fs.promises.readFile(filePath, 'utf8')];
                case 1:
                    fileContent = _a.sent();
                    jsonObject = JSON.parse(fileContent);
                    return [2 /*return*/, jsonObject];
            }
        });
    });
}
// 定义一个异步函数来写入文件
function writeJsonToFile(filePath, content) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.promises.writeFile(filePath, content, 'utf8')];
                case 1:
                    _a.sent();
                    console.log("JSON data has been successfully written to ".concat(filePath));
                    return [2 /*return*/];
            }
        });
    });
}
function findInstalledExtensions(data) {
    return __awaiter(this, void 0, void 0, function () {
        var extensions, ids, _i, extensions_1, m;
        return __generator(this, function (_a) {
            extensions = JSON.parse(data.extensions);
            console.log("xxxx", extensions);
            ids = [];
            for (_i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
                m = extensions_1[_i];
                if (!m.disabled) {
                    ids.push(m.identifier.id);
                }
            }
            return [2 /*return*/, ids];
        });
    });
}
var codeProfile = './tswindows.code-profile';
var codeWorkspace = './../cnjimbo.github.io.code-workspace';
readFileToJson(codeProfile)
    .then(function (data) {
    console.log('x');
    return findInstalledExtensions(data);
})
    .then(function (ids) {
    console.log(ids);
});
