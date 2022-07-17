import { Pool } from "pg";
import { IStock } from "../../src/types/stocks"
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.POSTGRES,
    ssl: {
        rejectUnauthorized: false
    }
});

class DBService {
    async createTables() {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS stocks(
                    id SERIAL PRIMARY KEY,
                    stock TEXT UNIQUE NOT NULL
                );
            `);
            console.log("tables created");
        } catch(e) {
            throw e;
        }
    }
    async getStocks() {
        try {
            const res = await pool.query<IStock>(`
                SELECT * FROM stocks;
            `)
            return res.rows;
        } catch(e) {
            throw e;
        }
    }
    async addStock(stock: string) {
        try {
            await pool.query(`
                INSERT INTO stocks(stock)
                VALUES('${stock}');
            `);
        } catch(e) {
            throw e;
        }
    }
    async rmStock(stock: string) {
        try {
            await pool.query(`
                DELETE FROM stocks
                WHERE stock='${stock}';
            `);
        } catch(e) {
            throw e;
        }
    }
}

export default new DBService();