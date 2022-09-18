/** 新增資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
export function insertQueryByOracle(tableName: string, params: object): any {
  const items = Object.keys(params);
  const columns = items.join(', ');
  const data = items.map(v => params[v]);
  const replacement = new Array(Object.keys(params).length).fill(':params').join(', ')
  const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${replacement})`

  return {
    sql,
    data
  }
}

/** 新增多筆資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @returns SQL 指令 與 注入資料
 */
export function insertMultipleQueryByOracle(tableName: string, params: Array<object>): any {
  const columns = Object.keys(params[0]).join(', ');
  const data = params.map(v => Object.keys(v).map(x => v[x]));
  const replacement = params.map(o => `(${new Array(Object.keys(o).length).fill(':params').join(', ')})`)
  const sql = `INSERT INTO ${tableName} (${columns}) VALUES ${replacement.join(', ')}`

  return {
    sql,
    data
  }
}

/** 更新資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令 與 注入資料
 */
export function updateQueryByOracle(tableName: string, params: object, key: string = 'id'): any {
  let columns: string;
  if (Object.keys(params).length === 1) {
    columns = `${Object.keys(params)[0]}=:params`;
  } else {
    columns = `${Object.keys(params).join('=:params, ')}=:params`;
  }
  const sql = `UPDATE ${tableName} SET ${columns} WHERE ${key} = :params`
  return sql
}

/** 刪除資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
export function deleteQueryByOracle(tableName: string, key: string = 'id'): string {
  const sql = `DELETE FROM ${tableName} WHERE ${key} = :params`;
  return sql
}

/** 刪除多筆資料的 SQL 指令
 * 
 * @param tableName 資料表名稱
 * @param params 參數
 * @param key 主鍵名稱
 * @returns SQL 指令
 */
export function deleteMultipleQueryByOracle(tableName: string, params: Array<string | number>, key: string = 'id'): string {
  const replacement = new Array(params.length).fill(':params').join(', ');
  const sql = `DELETE FROM ${tableName} WHERE ${key} IN (${replacement})`;
  return sql
}