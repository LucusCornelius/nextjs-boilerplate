import bcrypt from "bcrypt";
import { query } from "@lib/db";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ error: "Email and password required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        console.log("passwordHash:", passwordHash);

        const res = await query(
            "INSERT INTO customers (email, password_hash) VALUES ($1, $2) RETURNING id, email",
            [email, passwordHash]
        );

        const user = res.rows ? res.rows[0] : res;

        return new Response(
            JSON.stringify({ message: "Registration successful", user }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Register error:", err);
        return new Response(JSON.stringify({ error: "Registration failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
