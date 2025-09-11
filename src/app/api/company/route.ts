import {query} from "@lib/db";
import {NextResponse} from "@node_modules/next/server";

export async function GET(req) {
    try {
        const res = await query(
            `SELECT * FROM company`,
        );

        return NextResponse.json({ rows: res.rows });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}