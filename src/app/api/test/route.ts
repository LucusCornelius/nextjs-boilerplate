
import { query } from "../../../../lib/db";

export async function GET() {
    try {
        const res = await query('SELECT $1::text as message', ['Hello world!']);
        return new Response(JSON.stringify(res.rows[0]), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: `DB error ${err}` }), { status: 500 });
    }
}