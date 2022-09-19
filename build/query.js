"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultipleQuery = exports.deleteQueryWithMultipleKey = exports.deleteQuery = exports.updateQuery = exports.insertMultipleQuery = exports.insertQuery = void 0;
var lodash_1 = __importDefault(require("lodash"));
/** 新增資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
function insertQuery(tableName, params) {
    var items = Object.keys(params);
    var columns = items.join(', ');
    var data = items.map(function (v) { return params[v]; });
    var replacement = new Array(Object.keys(params).length).fill('?').join(', ');
    var sql = "INSERT INTO ".concat(tableName, " (").concat(columns, ") VALUES (").concat(replacement, ")");
    return {
        sql: sql,
        data: data
    };
}
exports.insertQuery = insertQuery;
/** 新增多筆資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
function insertMultipleQuery(tableName, params) {
    var columns = Object.keys(params[0]).join(', ');
    var data = params.map(function (v) { return Object.keys(v).map(function (x) { return v[x]; }); });
    var replacement = params.map(function (o) { return "(".concat(new Array(Object.keys(o).length).fill('?').join(', '), ")"); });
    var sql = "INSERT INTO ".concat(tableName, " (").concat(columns, ") VALUES ").concat(replacement.join(', '));
    return {
        sql: sql,
        data: data
    };
}
exports.insertMultipleQuery = insertMultipleQuery;
/** 更新資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @param keys 主鍵名稱
 * @returns SQL 指令 與 注入資料
 */
function updateQuery(tableName, params, keys) {
    var columns;
    var items = Object.keys(params);
    var keyItems = Object.keys(keys);
    var key = keyItems.map(function (v) { return "".concat(v, " = ?"); }).join(' AND ');
    if (Object.keys(params).length === 1) {
        columns = "".concat(items[0], "=?");
    }
    else {
        columns = "".concat(items.join('=?, '), "=?");
    }
    var data = items.map(function (d) { return params[d]; });
    var keyData = keyItems.map(function (d) { return keys[d]; });
    var sql = "UPDATE ".concat(tableName, " SET ").concat(columns, " WHERE ").concat(key);
    return {
        sql: sql,
        data: lodash_1.default.concat(data, keyData)
    };
}
exports.updateQuery = updateQuery;
/** 刪除資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
function deleteQuery(tableName, key) {
    if (key === void 0) { key = 'id'; }
    var sql = "DELETE FROM ".concat(tableName, " WHERE ").concat(key, " = ?");
    return sql;
}
exports.deleteQuery = deleteQuery;
/** 刪除資料的 SQL 指令 （使用複合鍵）
 *
 * @param tableName
 * @param keys
 * @returns SQL 指令 與 注入資料
 */
function deleteQueryWithMultipleKey(tableName, keys) {
    var items = Object.keys(keys);
    var key = items.map(function (v) { return "".concat(v, " = ?"); }).join(' AND ');
    var data = items.map(function (v) { return keys[v]; });
    var sql = "DELETE FROM ".concat(tableName, " WHERE ").concat(key);
    return {
        sql: sql,
        data: data
    };
}
exports.deleteQueryWithMultipleKey = deleteQueryWithMultipleKey;
/** 刪除多筆資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
function deleteMultipleQuery(tableName, params, key) {
    if (key === void 0) { key = 'id'; }
    var replacement = new Array(params.length).fill('?').join(', ');
    var sql = "DELETE FROM ".concat(tableName, " WHERE ").concat(key, " IN (").concat(replacement, ")");
    return sql;
}
exports.deleteMultipleQuery = deleteMultipleQuery;
