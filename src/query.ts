/** 新增資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
export function insertQuery(tableName: string, params: object): string {
  const columns = Object.keys(params).join(', ');
  const replacement = new Array(Object.keys(params).length).fill('?').join(', ')
  const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${replacement})`

  return sql
}

/** 新增多筆資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
export function insertMultipleQuery(tableName: string, params: Array<object>): string {
  const columns = Object.keys(params[0]).join(', ');
  const replacement = params.map(o => `(${new Array(Object.keys(o).length).fill('?').join(', ')})`)
  const sql = `INSERT INTO ${tableName} (${columns}) VALUES ${replacement.join(', ')}`
  return sql
}

/** 更新資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令 與 注入資料
 */
export function updateQuery(tableName: string, params: object, key: string = 'id'): string {
  let columns: string;
  if (Object.keys(params).length === 1) {
    columns = `${Object.keys(params)[0]}=?`;
  } else {
    columns = `${Object.keys(params).join('=?, ')}=?`;
  }
  const sql = `UPDATE ${tableName} SET ${columns} WHERE ${key} = ?`
  return sql
}

/** 刪除資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
export function deleteQuery(tableName: string, key: string = 'id'): string {
  const sql = `DELETE FROM ${tableName} WHERE ${key} = ?`;
  return sql
}

/** 刪除多筆資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
export function deleteMultipleQuery(tableName: string, params: Array<string | number>, key: string = 'id'): string {
  const replacement = new Array(params.length).fill('?').join(', ');
  const sql = `DELETE FROM ${tableName} WHERE ${key} IN (${replacement})`;
  return sql
}