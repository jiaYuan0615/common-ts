"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yieldUpdateItem = void 0;
var lodash_1 = __importDefault(require("lodash"));
function yieldUpdateItem(origin, update) {
    var preserveItems = lodash_1.default.xor(origin, update);
    var payload = { "shouldUpdate": false, };
    if (preserveItems.length) {
        payload["insertItem"] = lodash_1.default.intersection(preserveItems, update);
        payload["deleteItem"] = lodash_1.default.intersection(preserveItems, origin);
        payload["shouldUpdate"] = true;
    }
    return payload;
}
exports.yieldUpdateItem = yieldUpdateItem;
