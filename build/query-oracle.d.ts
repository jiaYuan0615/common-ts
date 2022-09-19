/** 新增資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
export declare function insertQueryByOracle(tableName: string, params: object): any;
/** 新增多筆資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
export declare function insertMultipleQueryByOracle(tableName: string, params: Array<object>): any;
/** 更新資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令 與 注入資料
 */
export declare function updateQueryByOracle(tableName: string, params: object, key?: string): any;
/** 更新資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令 與 注入資料
 */
export declare function updateQueryWithMultipleKeyByOracle(tableName: string, params: object, keys: any): any;
/** 刪除資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
export declare function deleteQueryByOracle(tableName: string, key?: string): string;
/** 刪除資料的 SQL 指令 （使用複合鍵）
 *
 * @param tableName
 * @param keys
 * @returns SQL 指令 與 注入資料
 */
export declare function deleteQueryWithMultipleKeyByOracle(tableName: string, keys: any): {
    sql: string;
    data: any[];
};
/** 刪除多筆資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
export declare function deleteMultipleQueryByOracle(tableName: string, params: Array<string | number>, key?: string): string;
