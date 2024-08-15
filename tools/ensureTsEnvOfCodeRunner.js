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
var path_1 = require("path");
var url_1 = require("url");
var fs_extra_1 = require("fs-extra");
var util_1 = require("./util");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var __parentdir = path_1.default.resolve(__dirname, '../');
log('root path:', __parentdir);
var codeWorkspace_file = '*.code-workspace';
var settings_file = '.vscode/settings.json';
var defaultSettings = {
    'code-runner.executorMap': {
        typescript: 'cd $dir && npx tsx $fullFileName'
    },
    'code-runner.executorMapByFileExtension': {
        '.ts': 'cd $dir && npx tsx $fullFileName'
    }
};
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var vs_filepath, cwfile, exist_codework_file, exist_vs_setting_file, cw, cw_setting, config, vs, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log('-----------------------------', 'start', '-----------------------------');
                    vs_filepath = path_1.default.resolve(__parentdir, settings_file);
                    return [4 /*yield*/, (0, util_1.checkCodeWorkspaceFilePath)(__parentdir, codeWorkspace_file)];
                case 1:
                    cwfile = _a.sent();
                    exist_codework_file = cwfile && fs_extra_1.default.existsSync(cwfile);
                    exist_vs_setting_file = fs_extra_1.default.existsSync(vs_filepath);
                    if (!exist_codework_file) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, util_1.readFileToJson)(cwfile)];
                case 2:
                    cw = _a.sent();
                    cw_setting = cw.settings;
                    config = (0, util_1.ensureConfigured)(cw_setting, defaultSettings);
                    if (!config.needRewrite) return [3 /*break*/, 4];
                    cw.settings = config.data;
                    return [4 /*yield*/, (0, util_1.writeJsonToFile)(cwfile, cw)];
                case 3:
                    _a.sent();
                    log('Configured .code-workspace:', cwfile);
                    return [3 /*break*/, 5];
                case 4:
                    log('No changed .code-workspace:', cwfile);
                    _a.label = 5;
                case 5:
                    if (!exist_vs_setting_file) return [3 /*break*/, 10];
                    return [4 /*yield*/, (0, util_1.readFileToJson)(vs_filepath)];
                case 6:
                    vs = _a.sent();
                    return [4 /*yield*/, (0, util_1.ensureConfigured)(vs, defaultSettings)];
                case 7:
                    config = _a.sent();
                    if (!config.needRewrite) return [3 /*break*/, 9];
                    vs = config.data;
                    return [4 /*yield*/, (0, util_1.writeJsonToFile)(vs_filepath, vs)];
                case 8:
                    _a.sent();
                    log('Configured  settings.json:', vs_filepath);
                    return [3 /*break*/, 10];
                case 9:
                    log('No changed settings.json:', vs_filepath);
                    _a.label = 10;
                case 10:
                    if (!(!exist_vs_setting_file && !exist_codework_file)) return [3 /*break*/, 12];
                    log('found neither settings.json nor *.code-workspace:');
                    log('paths:', vs_filepath, codeWorkspace_file);
                    log('create settings.json with default settings', vs_filepath);
                    return [4 /*yield*/, (0, util_1.writeJsonToFile)(vs_filepath, defaultSettings)];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [2 /*return*/];
            }
        });
    });
}
function log() {
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    console.log.apply(console, msg);
}
main()
    .catch(function (err) { return log('error:', err); })
    .finally(function () { return log('running end, exist'); });
