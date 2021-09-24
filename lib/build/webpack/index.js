"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWebpack = void 0;
var webpack_1 = __importDefault(require("webpack"));
var utils_1 = require("../../utils");
var webpack_base_config_1 = __importDefault(require("./webpack.base.config"));
var buildWebpack = function () {
    (0, utils_1.loggerTiming)('WEBPACK BUILD');
    var compiler = (0, webpack_1.default)((0, webpack_base_config_1.default)());
    try {
        compiler.run(function (err, stats) {
            if (err) {
                (0, utils_1.loggerError)(err);
            }
            else {
                (0, utils_1.loggerSuccess)('WEBPACK SUCCESS!');
            }
            compiler.close(function () {
                (0, utils_1.loggerInfo)('WEBPACK GENERATE CACHE');
            });
            (0, utils_1.loggerTiming)('WEBPACK BUILD', false);
        });
    }
    catch (error) {
        (0, utils_1.loggerError)(error);
    }
};
exports.buildWebpack = buildWebpack;
