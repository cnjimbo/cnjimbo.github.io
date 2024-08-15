"use strict";
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
exports.deepEqual = deepEqual;
exports.tryMerge = tryMerge;
exports.ensureConfigured = ensureConfigured;
exports.parseJsonWithComments = parseJsonWithComments;
exports.readFileToJson = readFileToJson;
exports.writeJsonToFile = writeJsonToFile;
exports.objectKeysIncludes = objectKeysIncludes;
exports.checkCodeWorkspaceFilePath = checkCodeWorkspaceFilePath;
var lodash_1 = require("lodash");
var fs_extra_1 = require("fs-extra");
var json5_1 = require("json5");
var glob_1 = require("glob");
function deepEqual(obj1, obj2) {
    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length)
        return false;
    for (var _i = 0, keys1_1 = keys1; _i < keys1_1.length; _i++) {
        var key = keys1_1[_i];
        if (!keys2.includes(key))
            return false;
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            if (!deepEqual(obj1[key], obj2[key]))
                return false;
        }
        else {
            if (obj1[key] !== obj2[key])
                return false;
        }
    }
    // 所有键值对都相等
    return true;
}
function tryMerge(preferSettings, newSettings) {
    var needRewrite = !deepEqual(preferSettings, newSettings);
    var obj = { needRewrite: needRewrite, data: preferSettings };
    if (needRewrite) {
        obj.data = lodash_1.default.merge({}, newSettings, preferSettings);
    }
    else {
        obj.data = preferSettings;
    }
    return obj;
}
function ensureConfigured(currentSettings, part_settings) {
    var needRewrite = !objectKeysIncludes(part_settings, currentSettings);
    if (needRewrite) {
        return tryMerge(part_settings, currentSettings);
    }
    return { needRewrite: false, data: currentSettings };
}
function parseJsonWithComments(jsonString) {
    return json5_1.default.parse(jsonString);
}
function readFileToJson(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var fileContent;
        return __generator(this, function (_a) {
            if (!fs_extra_1.default.existsSync(filePath)) {
                throw new Error("file not exist: ".concat(filePath));
            }
            fileContent = fs_extra_1.default.readFileSync(filePath, 'utf8');
            if (!fileContent || fileContent.length === 0)
                throw new Error("do not read any json string from file: ".concat(filePath));
            return [2 /*return*/, parseJsonWithComments(fileContent)];
        });
    });
}
function writeJsonToFile(filePath, jsonObject) {
    return __awaiter(this, void 0, void 0, function () {
        var content;
        return __generator(this, function (_a) {
            content = JSON.stringify(jsonObject, null, '  ');
            return [2 /*return*/, fs_extra_1.default.writeFile(filePath, content, 'utf8')
                    .then(function () {
                    console.log("JSON data has been successfully written to ".concat(filePath));
                    return true;
                })
                    .catch(function (err) {
                    console.log("error on writting to ".concat(filePath), err);
                    return false;
                })];
        });
    });
}
function objectKeysIncludes(subObj, parentObj) {
    if (parentObj == null)
        throw new Error('parent object can\'t be undefined or null');
    if (subObj == null)
        return true;
    var sourceKeys = Object.keys(subObj);
    var referenceKeys = Object.keys(parentObj);
    // 检查 subObj 的所有键是否都在 parentObj 中
    return sourceKeys.every(function (key) { return referenceKeys.includes(key); });
}
function checkCodeWorkspaceFilePath(basedir, codeWorkspaceFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, glob_1.glob)(codeWorkspaceFilePath, { cwd: basedir, absolute: true })
                        .then(function (files) {
                        if (files && files.length > 0) {
                            if (files.length > 1) {
                                console.log('only support one file with .code-workspace in the current project. selected file:', files[0]);
                            }
                            return files[0];
                        }
                        console.log("can't find any code-workspace file with parttern: ".concat(codeWorkspaceFilePath));
                        return undefined;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
