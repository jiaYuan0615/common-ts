"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultipleQuery = exports.deleteQuery = exports.updateQuery = exports.insertMultipleQuery = exports.insertQuery = void 0;
/** 新增資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
function insertQuery(tableName, params) {
    var columns = Object.keys(params).join(', ');
    var replacement = new Array(Object.keys(params).length).fill('?').join(', ');
    var sql = "INSERT INTO ".concat(tableName, " (").concat(columns, ") VALUES (").concat(replacement, ")");
    return sql;
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
    var replacement = params.map(function (o) { return "(".concat(new Array(Object.keys(o).length).fill('?').join(', '), ")"); });
    var sql = "INSERT INTO ".concat(tableName, " (").concat(columns, ") VALUES ").concat(replacement.join(', '));
    return sql;
}
exports.insertMultipleQuery = insertMultipleQuery;
/** 更新資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令 與 注入資料
 */
function updateQuery(tableName, params, key) {
    if (key === void 0) { key = 'id'; }
    var columns;
    if (Object.keys(params).length === 1) {
        columns = "".concat(Object.keys(params)[0], "=?");
    }
    else {
        columns = "".concat(Object.keys(params).join('=?, '), "=?");
    }
    var sql = "UPDATE ".concat(tableName, " SET ").concat(columns, " WHERE ").concat(key, " = ?");
    return sql;
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
