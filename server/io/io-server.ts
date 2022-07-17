import { Server } from "socket.io"
import ioService from "../services/io-service";

const ioServer = (io: Server) => {
    io.on("connection", socket=>{
        socket.on("request-data", async()=>{
            ioService.fetchData(socket);
        })
        socket.on("stock-add", async (stock: string) => {
            ioService.addStock(stock, io, socket);
        });
        socket.on("stock-rm", async(stock: string) => {
            ioService.rmStock(stock, io, socket);
        })
    });
}

export default ioServer;