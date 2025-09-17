// /app/api/work-hours/route.ts
import { NextResponse } from "next/server";
import { query } from "@lib/db";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const EMPLOYEE_IDS = [3, 4, 5, 6, 7, 8];

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const companyId = Number(url.searchParams.get("companyId"));

    console.log(companyId);

    const res = await query(
      `SELECT
         w.id,
         w.user_id,
         w.date,
         w.clock_in,
         w.clock_out,
         w.total_hours,
         w.project,
         w.status,
         w.company_id
     FROM work_hours w
     WHERE w.company_id = $1
     ORDER BY w.date ASC, w.user_id ASC`,
      [companyId],
    );

    console.log(res.rows);
    return NextResponse.json({ rows: res.rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.userId;

    if (!EMPLOYEE_IDS.includes(userId)) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const { date, clockIn, clockOut, project, companyId } = await req.json();

    console.log(companyId);

    const totalHours =
      (new Date(`1970-01-01T${clockOut}`) - new Date(`1970-01-01T${clockIn}`)) /
      36e5;

    const res = await query(
      `INSERT INTO work_hours (user_id, date, clock_in, clock_out, total_hours, project, status, company_id)
             VALUES ($1,$2,$3,$4,$5,$6,'Pending',$7) RETURNING *`,
      [userId, date, clockIn, clockOut, totalHours, project, companyId],
    );

    return NextResponse.json({ message: "Work hours added", row: res.rows[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
