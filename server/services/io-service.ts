import { Server, Socket } from "socket.io";
import dbService from "./db-service";
import stockService from "./stock-service";
import stocks from "../stocks";

class IoService {
    async fetchData(socket: Socket) {
        try {
            socket.emit("load-start");
            const data = await stockService.getData();
            socket.emit("data", data);
        } catch(e: any) {
            console.log(e);
            socket.emit("error", e.message);
        } finally {
            socket.emit("load-end");
        }
    }
    async addStock(stock: string, io: Server, socket: Socket) {
        try {
            socket.emit("load-start");
            if(stocks.map(entry=>entry.Symbol).includes(stock)){
                if(await stockService.addData(stock)){
                    const data = await stockService.getData();
                    io.emit("data", data);
                }
            }
        } catch(e: any) {
            console.log(e)
            socket.emit("error", e.message);
        } finally {
            socket.emit("load-end");
        }
    }
    async rmStock(stock: string, io: Server, socket: Socket) {
        try {
            socket.emit("load-start");
            await dbService.rmStock(stock);
            const data = await stockService.getData();
            io.emit("data", data);
        } catch(e: any) {
            console.log(e)
            socket.emit("error", e.message);
        } finally {
            socket.emit("load-end");
        }
    }
}

export default new IoService();