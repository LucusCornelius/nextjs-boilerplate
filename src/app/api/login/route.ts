import 'dotenv/config';
import { query} from "../../../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import {NextResponse} from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;
const secure    = process.env.NODE_ENV === "production" ? "Secure" : "";



export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const res = await query(
            'SELECT id, email, password_hash FROM customers WHERE email = $1',
            [email]
        );

        if (res.rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
        }

        const user = res.rows[0];

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
        }

        const isAdmin = user.id > 2 && user.id < 9;


        const token = jwt.sign(
            { userId: user.id, email: user.email, admin: isAdmin },
            JWT_SECRET,
            { expiresIn: "1d" }
        );




        const redirect = isAdmin ? "/dashboard/admin" : "/dashboard";

        return new Response(JSON.stringify({ message: 'Login successful', redirect, token }), {
            status: 200,
            headers: {
                "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict;`,
                "Content-Type": "application/json"
            },
        });



    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
