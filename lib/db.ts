import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
    connectionString: "postgresql://lucasvissers@localhost:5432/fliss",
});


export const query = (text: string, params?: any[]) => pool.query(text, params);
