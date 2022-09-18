import { strictEqual } from 'assert';
import { expect } from 'chai';
import { insertQueryByOracle, insertMultipleQueryByOracle, updateQueryByOracle, deleteQueryByOracle, deleteMultipleQueryByOracle } from '../src/query-oracle'

describe('[Oracle] 資料庫指令', () => {
  it('[Oracle] 測試新增單筆資料指令', () => {
    const payload = {
      id: "1",
      email: "test@email.com",
      password: "password",
      status: true
    }
    const expectData = Object.keys(payload).map(v => payload[v]);
    const expected = 'INSERT INTO users (id, email, password, status) VALUES (:params, :params, :params, :params)';
    const { sql, data } = insertQueryByOracle("users", payload);

    strictEqual(sql, expected);
    expect(expectData).to.eql(data);
  })

  it('[Oracle] 測試新增多筆資料指令', () => {
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
    const expected = 'INSERT INTO users (id, email, password, status) VALUES (:params, :params, :params, :params), (:params, :params, :params, :params)';
    const { sql, data } = insertMultipleQueryByOracle("users", payload);
    strictEqual(sql, expected);
    expect(expectData).to.eql(data);
  })

  it('[Oracle] 測試更新資料指令', () => {
    const payload = {
      "email": "test@test.com",
      "password": "password"
    }
    const expected = 'UPDATE users SET email=:params, password=:params WHERE id = :params'
    const actual = updateQueryByOracle("users", payload)
    strictEqual(actual, expected)

    const payload1 = {
      "password": "password"
    }
    const expectd1 = 'UPDATE users SET password=:params WHERE userId = :params'
    const actual1 = updateQueryByOracle("users", payload1, "userId");
    strictEqual(actual1, expectd1);
  })

  it('[Oracle] 測試刪除單筆資料指令', () => {
    const expectd = 'DELETE FROM users WHERE id = :params';
    const actual = deleteQueryByOracle("users")
    strictEqual(actual, expectd)
  })

  it('[Oracle] 測試刪除資料指令（根據傳入鍵值）', () => {
    const expectd = 'DELETE FROM users WHERE avatarId = :params';
    const actual = deleteQueryByOracle("users", "avatarId")
    strictEqual(actual, expectd)
  })

  it('[Oracle] 測試刪除多筆資料指令', () => {
    const payloads = [1, 2, 3];
    const expectd = 'DELETE FROM users WHERE id IN (:params, :params, :params)';
    const actual = deleteMultipleQueryByOracle("users", payloads)
    strictEqual(actual, expectd)
  })

  it('[Oracle] 測試刪除多筆資料指令（根據傳入鍵值）', () => {
    const payloads = [1, 2, 3];
    const expectd = 'DELETE FROM users WHERE grade IN (:params, :params, :params)';
    const actual = deleteMultipleQueryByOracle("users", payloads, "grade")
    strictEqual(actual, expectd)
  })
})