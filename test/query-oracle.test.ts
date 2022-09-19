import { strictEqual } from 'assert';
import { expect } from 'chai';
import {
  insertQueryByOracle,
  insertMultipleQueryByOracle,
  updateQueryByOracle,
  deleteQueryByOracle,
  deleteMultipleQueryByOracle,
  deleteQueryWithMultipleKeyByOracle,
  updateQueryWithMultipleKeyByOracle
} from '../src/query-oracle'

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
    const { sql, data } = updateQueryByOracle("users", payload)
    const expectData = Object.keys(payload).map((d: any) => payload[d])
    strictEqual(sql, expected)
    expect(expectData).to.eql(data);

    const payload1 = {
      "password": "password"
    }
    const expectd1 = 'UPDATE users SET password=:params WHERE userId = :params'
    const { sql: actual1, data: data1 } = updateQueryByOracle("users", payload1, "userId");
    const expectData1 = Object.keys(payload1).map((d: any) => payload1[d])
    strictEqual(actual1, expectd1);
    expect(expectData1).to.eql(data1);
  })

  it('[Oracle] 測試更新資料指令（複合鍵）', () => {
    const payload = {
      "email": "test@test.com",
      "password": "password"
    }
    const keys = {
      CARDNO: "1",
      RECDT: "2",
      RECTM: "3"
    }
    const expected = 'UPDATE users SET email=:params, password=:params WHERE CARDNO = :params AND RECDT = :params AND RECTM = :params'
    const { sql, data } = updateQueryWithMultipleKeyByOracle("users", payload, keys)
    const expectData = Object.keys(payload).map((d: any) => payload[d])
    strictEqual(sql, expected)
    expect(expectData).to.eql(data);

    const payload1 = {
      "password": "password"
    }
    const expectd1 = 'UPDATE users SET password=:params WHERE CARDNO = :params AND RECDT = :params AND RECTM = :params'
    const { sql: actual1, data: data1 } = updateQueryWithMultipleKeyByOracle("users", payload1, keys);
    const expectData1 = Object.keys(payload1).map((d: any) => payload1[d])
    expect(expectData1).to.eql(data1);
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

  it('[Oracle] 測試刪除資料指令（複合鍵）', () => {
    const payload = {
      CARDNO: "1",
      RECDT: "2",
      RECTM: "3"
    }
    const expectd = 'DELETE FROM users WHERE CARDNO = :params AND RECDT = :params AND RECTM = :params';
    const { sql, data } = deleteQueryWithMultipleKeyByOracle("users", payload)
    const expectData = Object.keys(payload).map(v => payload[v]);
    strictEqual(sql, expectd)
    expect(expectData).to.eql(data);
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