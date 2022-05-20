"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultipleQuery = exports.deleteQuery = exports.updateQuery = exports.insertMultipleQuery = exports.insertQuery = void 0;
var uuid_1 = require("uuid");
/** 新增資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
function insertQuery(tableName, params) {
    var columns = Object.keys(params).join(', ');
    var values = Object.keys(params).map(function (v) { return params[v]; });
    // First Item is P.K.
    var primaryKey = (0, uuid_1.v4)();
    values.splice(0, 0, primaryKey);
    var replacement = new Array(Object.keys(params).length + 1).fill('?').join(', ');
    var sql = "INSERT INTO ".concat(tableName, " (id, ").concat(columns, ") VALUES (").concat(replacement, ")");
    return {
        primaryKey: primaryKey,
        sql: sql,
        values: values
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
    var values = [];
    var primaryKeys = [];
    var replacement = params.map(function (o) {
        var primaryKey = (0, uuid_1.v4)();
        values.push(primaryKey);
        primaryKeys.push(primaryKey);
        Object.keys(o).map(function (v) { return values.push(o[v]); });
        return "(".concat(new Array(Object.keys(o).length + 1).fill('?').join(', '), ")");
    });
    var sql = "INSERT INTO ".concat(tableName, " (id, ").concat(columns, ") VALUES ").concat(replacement.join(', '));
    return {
        primaryKeys: primaryKeys,
        sql: sql,
        values: values
    };
}
exports.insertMultipleQuery = insertMultipleQuery;
/** 更新資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @param id 主鍵值
 * @param key 主鍵名稱
 * @returns SQL 指令 與 注入資料
 */
function updateQuery(tableName, params, id, key) {
    if (key === void 0) { key = 'id'; }
    var columns;
    if (Object.keys(params).length === 1) {
        columns = "".concat(Object.keys(params)[0], "=?");
    }
    else {
        columns = "".concat(Object.keys(params).join('=?, '), "=?");
    }
    var values = Object.keys(params).map(function (v) { return params[v]; });
    // Final Key is P.K.
    values.push(id);
    var sql = "UPDATE ".concat(tableName, " SET ").concat(columns, " WHERE ").concat(key, " = ?");
    return {
        sql: sql,
        values: values
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
