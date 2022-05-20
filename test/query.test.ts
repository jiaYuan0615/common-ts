import { strictEqual } from 'assert';
import { v4 as uuid } from 'uuid';
import { insertQuery, insertMultipleQuery, updateQuery, deleteQuery, deleteMultipleQuery } from '../src/query'

describe('資料庫指令', () => {
  it('回傳新增單筆指令', () => {
    const payload = {
      "email": "test@email.com",
      "password": "password",
      "status": true
    }
    const expected = 'INSERT INTO users (id, email, password, status) VALUES (?, ?, ?, ?)';
    const { sql: actual } = insertQuery("users", payload);
    strictEqual(actual, expected);
  })

  it('回傳新增多筆指令', () => {
    const payload = [
      {
        "email": "test@test.com",
        "password": "password",
        "status": true
      },
      {
        "email": "test@test.com",
        "password": "password",
        "status": true
      }
    ]
    const expected = 'INSERT INTO users (id, email, password, status) VALUES (?, ?, ?, ?), (?, ?, ?, ?)';
    const { sql: actual } = insertMultipleQuery("users", payload);
    strictEqual(actual, expected);
  })

  it('回傳更新指令', () => {
    const payload = {
      "email": "test@test.com",
      "password": "password"
    }
    const primaryKey = uuid();
    const expected = 'UPDATE users SET email=?, password=? WHERE id = ?'
    const { sql: actual } = updateQuery("users", payload, primaryKey)
    strictEqual(actual, expected)

    const payload1 = {
      "password": "password"
    }
    const expectd1 = 'UPDATE users SET password=? WHERE id = ?'
    const { sql: actual1 } = updateQuery("users", payload1, primaryKey);
    strictEqual(actual1, expectd1);
  })

  it('回傳刪除單筆指令', () => {
    const expectd = 'DELETE FROM users WHERE id = ?';
    const actual = deleteQuery("users")
    strictEqual(actual, expectd)
  })

  it('回傳刪除多筆指令', () => {
    const payloads = [1, 2, 3];
    const expectd = 'DELETE FROM users WHERE id IN (?, ?, ?)';
    const actual = deleteMultipleQuery("users", payloads)
    strictEqual(actual, expectd)
  })
})