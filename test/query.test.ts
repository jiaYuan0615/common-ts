import { strictEqual } from 'assert';
import { expect } from 'chai';
import { insertQuery, insertMultipleQuery, updateQuery, deleteQuery, deleteMultipleQuery } from '../src/query'

describe('資料庫指令', () => {
  it('測試新增單筆資料指令', () => {
    const payload = {
      id: "1",
      email: "test@email.com",
      password: "password",
      status: true
    }
    const expectData = Object.keys(payload).map(v => payload[v]);
    const expected = 'INSERT INTO users (id, email, password, status) VALUES (?, ?, ?, ?)';
    const { sql, data } = insertQuery("users", payload);

    strictEqual(sql, expected);
    expect(expectData).to.eql(data);
  })

  it('測試新增多筆資料指令', () => {
    const payload = [
      {
        id: "1",
        email: "test@test.com",
        password: "password",
        status: true
      },
      {
        id: "2",
        email: "test@test.com",
        password: "password",
        status: true
      }
    ]
    const expectData = payload.map(v => Object.keys(v).map(x => v[x]));
    const expected = 'INSERT INTO users (id, email, password, status) VALUES (?, ?, ?, ?), (?, ?, ?, ?)';
    const { sql, data } = insertMultipleQuery("users", payload);
    strictEqual(sql, expected);
    expect(expectData).to.eql(data);
  })

  it('測試更新資料指令', () => {
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

  it('測試刪除單筆資料指令', () => {
    const expectd = 'DELETE FROM users WHERE id = ?';
    const actual = deleteQuery("users")
    strictEqual(actual, expectd)
  })

  it('測試刪除資料指令（根據傳入鍵值）', () => {
    const expectd = 'DELETE FROM users WHERE avatarId = ?';
    const actual = deleteQuery("users", "avatarId")
    strictEqual(actual, expectd)
  })

  it('測試刪除多筆資料指令', () => {
    const payloads = [1, 2, 3];
    const expectd = 'DELETE FROM users WHERE id IN (?, ?, ?)';
    const actual = deleteMultipleQuery("users", payloads)
    strictEqual(actual, expectd)
  })

  it('測試刪除多筆資料指令（根據傳入鍵值）', () => {
    const payloads = [1, 2, 3];
    const expectd = 'DELETE FROM users WHERE grade IN (?, ?, ?)';
    const actual = deleteMultipleQuery("users", payloads, "grade")
    strictEqual(actual, expectd)
  })
})