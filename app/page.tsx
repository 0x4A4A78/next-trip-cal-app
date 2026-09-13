"use client";
import { useMemo, useState } from "react";
const fmt = (n: number) =>
  new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }).format(n);
type Expense = { name: string; amount: string; paidBy: string };
const BrandIcon = () => (<BrandIcon />);

export default function Home() {
  const [members, setMembers] = useState(["คุณ", "มิน", "แพรว"]);
  const [distance, setDistance] = useState("480");
  const [efficiency, setEfficiency] = useState("14");
  const [fuelPrice, setFuelPrice] = useState("36.5");
  const [expenses, setExpenses] = useState<Expense[]>([
    { name: "ที่พัก", amount: "2400", paidBy: "คุณ" },
    { name: "ทางด่วน", amount: "320", paidBy: "มิน" },
  ]);
  const fuel =
    ((Number(distance) || 0) / (Number(efficiency) || 1)) *
    (Number(fuelPrice) || 0);
  const extra = expenses.reduce((s, x) => s + (Number(x.amount) || 0), 0);
  const total = fuel + extra;
  const share = members.length ? total / members.length : 0;
  const paid = useMemo(
    () =>
      Object.fromEntries(
        members.map((m) => [
          m,
          expenses
            .filter((x) => x.paidBy === m)
            .reduce((s, x) => s + (Number(x.amount) || 0), 0),
        ]),
      ),
    [members, expenses],
  );
  const addMember = () =>
    setMembers([...members, `คนที่ ${members.length + 1}`]);
  const addExpense = () =>
    setExpenses([
      ...expenses,
      { name: "ค่าใช้จ่ายใหม่", amount: "0", paidBy: members[0] || "คุณ" },
    ]);
  return (
    <main className="shell">
      <div className="wrap">
        <nav className="topbar">
          <div className="brand">
            <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/><path d="M12 4v2M20 12h-2M12 20v-2M4 12h2"/></svg>
            <span>ROAMLY</span>
          </div>
          <span className="toplink">ทริปนี้ หารกันแฟร์กว่าเดิม</span>
        </nav>
        <section className="hero">
          <div className="eyebrow">Trip splitter / 05</div>
          <h1>
            ออกทริปให้สนุก
            <br />
            หารง่ายไม่ต้องทวง
          </h1>
          <p>
            รวมค่าน้ำมัน ค่าใช้จ่ายต่าง ๆ
            และสรุปยอดที่แต่ละคนควรจ่ายในมุมมองเดียว
          </p>
        </section>
        <div className="grid">
          <section className="card">
            <h2>รายละเอียดทริป</h2>
            <div className="form-grid">
              <label className="field full">
                <span className="label">
                  ระยะทางรวม <small>(กิโลเมตร)</small>
                </span>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </label>
              <label className="field">
                <span className="label">
                  อัตราสิ้นเปลือง <small>(กม./ลิตร)</small>
                </span>
                <input
                  className="input"
                  type="number"
                  min="1"
                  value={efficiency}
                  onChange={(e) => setEfficiency(e.target.value)}
                />
              </label>
              <label className="field">
                <span className="label">
                  ราคาน้ำมัน <small>(บาท/ลิตร)</small>
                </span>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(e.target.value)}
                />
              </label>
            </div>
            <div className="metric-row" style={{ marginTop: 20 }}>
              <span>ค่าน้ำมันรวม</span>
              <strong>฿{fmt(fuel)}</strong>
            </div>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ margin: 0 }}>สมาชิก ({members.length})</h2>
              <button className="button ghost" onClick={addMember}>
                + เพิ่มคน
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 12,
              }}
            >
              {members.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#202635",
                    borderRadius: 99,
                    padding: "7px 10px",
                    fontSize: 13,
                  }}
                >
                  {m}
                  {members.length > 1 && (
                    <button
                      onClick={() =>
                        setMembers(members.filter((_, j) => j !== i))
                      }
                      style={{
                        border: 0,
                        background: "none",
                        color: "#929bad",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="card result">
            <div className="result-main">
              <div className="result-label">ค่าใช้จ่ายรวมทั้งทริป</div>
              <div className="big-number">฿{fmt(total)}</div>
              <span className="badge">เฉลี่ยคนละ ฿{fmt(share)}</span>
            </div>
            <div>
              <div className="metric-row">
                <span>ค่าน้ำมัน</span>
                <strong>฿{fmt(fuel)}</strong>
              </div>
              <div className="metric-row">
                <span>ค่าใช้จ่ายอื่น ๆ</span>
                <strong>฿{fmt(extra)}</strong>
              </div>
            </div>
          </section>
        </div>
        <section className="card" style={{ marginTop: 18 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <h2 style={{ margin: 0 }}>ค่าใช้จ่ายอื่น ๆ</h2>
            <button className="button ghost" onClick={addExpense}>
              + เพิ่มรายการ
            </button>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>รายการ</th>
                  <th>จำนวนเงิน</th>
                  <th>ผู้จ่าย</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((x, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        className="input"
                        value={x.name}
                        onChange={(e) => {
                          const a = [...expenses];
                          a[i] = { ...a[i], name: e.target.value };
                          setExpenses(a);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        className="input"
                        type="number"
                        value={x.amount}
                        onChange={(e) => {
                          const a = [...expenses];
                          a[i] = { ...a[i], amount: e.target.value };
                          setExpenses(a);
                        }}
                      />
                    </td>
                    <td>
                      <select
                        className="select"
                        value={x.paidBy}
                        onChange={(e) => {
                          const a = [...expenses];
                          a[i] = { ...a[i], paidBy: e.target.value };
                          setExpenses(a);
                        }}
                      >
                        {members.map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="button ghost"
                        onClick={() =>
                          setExpenses(expenses.filter((_, j) => j !== i))
                        }
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="card" style={{ marginTop: 18 }}>
          <h2>สรุปยอดแต่ละคน</h2>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>สมาชิก</th>
                  <th>จ่ายไปแล้ว</th>
                  <th>ควรจ่าย</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => {
                  const balance = (paid[m] || 0) - share;
                  return (
                    <tr key={m}>
                      <td>{m}</td>
                      <td>฿{fmt(paid[m] || 0)}</td>
                      <td>฿{fmt(share)}</td>
                      <td
                        style={{ color: balance >= 0 ? "#67cf9a" : "#f1ba63" }}
                      >
                        {balance >= 0
                          ? `รับคืน ฿${fmt(balance)}`
                          : `จ่ายเพิ่ม ฿${fmt(-balance)}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        <div className="footer">
          สรุปจากข้อมูลที่กรอก ณ ตอนนี้ · แนะนำให้เคลียร์ยอดกันก่อนจบทริป
        </div>
      </div>
    </main>
  );
}
