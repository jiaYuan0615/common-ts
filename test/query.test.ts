import { strictEqual } from 'assert';
import { insertQuery, insertMultipleQuery, updateQuery, deleteQuery, deleteMultipleQuery } from '../src/query'

describe('資料庫指令', () => {
  it('回傳新增單筆指令', () => {
    const payload = {
      "id": "1",
      "email": "test@email.com",
      "password": "password",
      "status": true
    }
    const expected = 'INSERT INTO users (id, email, password, status) VALUES (?, ?, ?, ?)';
    const actual = insertQuery("users", payload);
    strictEqual(actual, expected);
  })

  it('回傳新增多筆指令', () => {
    const payload = [
      {
        "id": "1",
        "email": "test@test.com",
        "password": "password",
        "status": true
      },
      {
        "id": "2",
        "email": "test@test.com",
        "password": "password",
        "status": true
      }
    ]
    const expected = 'INSERT INTO users (id, email, password, status) VALUES (?, ?, ?, ?), (?, ?, ?, ?)';
    const actual = insertMultipleQuery("users", payload);
    strictEqual(actual, expected);
  })

  it('回傳更新指令', () => {
    const payload = {
      "email": "test@test.com",
      "password": "password"
    }
    const expected = 'UPDATE users SET email=?, password=? WHERE id = ?'
    const actual = updateQuery("users", payload)
    strictEqual(actual, expected)

    const payload1 = {
      "password": "password"
    }
    const expectd1 = 'UPDATE users SET password=? WHERE userId = ?'
    const actual1 = updateQuery("users", payload1, "userId");
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