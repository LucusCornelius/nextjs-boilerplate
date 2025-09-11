import { jwtVerify } from "jose";

export async function GET(req) {
    const token = req.cookies.get("token")?.value;
    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
        const { payload } = await jwtVerify(token, secret);
        return new Response(JSON.stringify({ userId: payload.userId, email: payload.email }));
    } catch {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }
}