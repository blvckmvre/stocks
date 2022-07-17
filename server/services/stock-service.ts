import axios from "axios"
import { IStockResponse } from "../../src/types/stocks"
import dbService from "./db-service";
require("dotenv").config();

const url = process.env.API_URL as string;
const apikey = process.env.API_KEY!;

class StockService {
    async getData() {
        try {
            const symbols = await dbService.getStocks();
            if(!symbols.length)
                return [];
            const res = await axios.get(url+"/v8/finance/spark", {
                headers: {
                    "x-api-key": apikey
                },
                params: {
                    interval: "1d",
                    range: "5d",
                    symbols: symbols.map(entry=>entry.stock).join(","),
                }
            });
            return Object.values(res.data) as unknown as IStockResponse[];
        } catch(e) {
            throw e;
        }
    }
    async addData(stock: string) {
        try {
            const rows = await dbService.getStocks();
            if(rows.length===5)
                return false;
            await dbService.addStock(stock);
            return true;
        } catch(e) {
            throw e;
        }
    }
}

export default new StockService();

