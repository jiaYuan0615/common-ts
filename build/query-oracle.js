"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultipleQueryByOracle = exports.deleteQueryWithMultipleKeyByOracle = exports.deleteQueryByOracle = exports.updateQueryWithMultipleKeyByOracle = exports.updateQueryByOracle = exports.insertMultipleQueryByOracle = exports.insertQueryByOracle = void 0;
/** 新增資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
function insertQueryByOracle(tableName, params) {
    var items = Object.keys(params);
    var columns = items.join(', ');
    var data = items.map(function (v) { return params[v]; });
    var replacement = new Array(Object.keys(params).length).fill(':params').join(', ');
    var sql = "INSERT INTO ".concat(tableName, " (").concat(columns, ") VALUES (").concat(replacement, ")");
    return {
        sql: sql,
        data: data
    };
}
exports.insertQueryByOracle = insertQueryByOracle;
/** 新增多筆資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
function insertMultipleQueryByOracle(tableName, params) {
    var columns = Object.keys(params[0]).join(', ');
    var data = params.map(function (v) { return Object.keys(v).map(function (x) { return v[x]; }); });
    var replacement = params.map(function (o) { return "(".concat(new Array(Object.keys(o).length).fill(':params').join(', '), ")"); });
    var sql = "INSERT INTO ".concat(tableName, " (").concat(columns, ") VALUES ").concat(replacement.join(', '));
    return {
        sql: sql,
        data: data
    };
}
exports.insertMultipleQueryByOracle = insertMultipleQueryByOracle;
/** 更新資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令 與 注入資料
 */
function updateQueryByOracle(tableName, params, key) {
    if (key === void 0) { key = 'id'; }
    var columns;
    var items = Object.keys(params);
    if (items.length === 1) {
        columns = "".concat(items[0], "=:params");
    }
    else {
        columns = "".concat(items.join('=:params, '), "=:params");
    }
    var data = items.map(function (d) { return params[d]; });
    var sql = "UPDATE ".concat(tableName, " SET ").concat(columns, " WHERE ").concat(key, " = :params");
    return {
        sql: sql,
        data: data
    };
}
exports.updateQueryByOracle = updateQueryByOracle;
/** 更新資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令 與 注入資料
 */
function updateQueryWithMultipleKeyByOracle(tableName, params, keys) {
    var columns;
    var items = Object.keys(params);
    var key = Object.keys(keys).map(function (v) { return "".concat(v, " = :params"); }).join(' AND ');
    if (items.length === 1) {
        columns = "".concat(items[0], "=:params");
    }
    else {
        columns = "".concat(items.join('=:params, '), "=:params");
    }
    var data = items.map(function (d) { return params[d]; });
    var sql = "UPDATE ".concat(tableName, " SET ").concat(columns, " WHERE ").concat(key);
    return {
        sql: sql,
        data: data
    };
}
exports.updateQueryWithMultipleKeyByOracle = updateQueryWithMultipleKeyByOracle;
/** 刪除資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
function deleteQueryByOracle(tableName, key) {
    if (key === void 0) { key = 'id'; }
    var sql = "DELETE FROM ".concat(tableName, " WHERE ").concat(key, " = :params");
    return sql;
}
exports.deleteQueryByOracle = deleteQueryByOracle;
/** 刪除資料的 SQL 指令 （使用複合鍵）
 *
 * @param tableName
 * @param keys
 * @returns SQL 指令 與 注入資料
 */
function deleteQueryWithMultipleKeyByOracle(tableName, keys) {
    var items = Object.keys(keys);
    var key = items.map(function (v) { return "".concat(v, " = :params"); }).join(' AND ');
    var data = items.map(function (v) { return keys[v]; });
    var sql = "DELETE FROM ".concat(tableName, " WHERE ").concat(key);
    return {
        sql: sql,
        data: data
    };
}
exports.deleteQueryWithMultipleKeyByOracle = deleteQueryWithMultipleKeyByOracle;
/** 刪除多筆資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
function deleteMultipleQueryByOracle(tableName, params, key) {
    if (key === void 0) { key = 'id'; }
    var replacement = new Array(params.length).fill(':params').join(', ');
    var sql = "DELETE FROM ".concat(tableName, " WHERE ").concat(key, " IN (").concat(replacement, ")");
    return sql;
}
exports.deleteMultipleQueryByOracle = deleteMultipleQueryByOracle;
