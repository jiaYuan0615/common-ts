/** 新增資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
export declare function insertQuery(tableName: string, params: any): any;
/** 新增多筆資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
export declare function insertMultipleQuery(tableName: string, params: Array<any>): any;
/** 更新資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @param id 主鍵值
 * @param key 主鍵名稱
 * @returns SQL 指令 與 注入資料
 */
export declare function updateQuery(tableName: string, params: any, id: string, key?: string): any;
/** 刪除資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
export declare function deleteQuery(tableName: string, key?: string): string;
/** 刪除多筆資料的 SQL 指令
 *
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
export declare function deleteMultipleQuery(tableName: string, params: Array<any>, key?: string): string;
