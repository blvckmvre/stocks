import express from "express"
import bp from 'body-parser'
import cors from "cors"
import http from "http"
import { Server } from "socket.io";
import ioServer from "./io/io-server";
import dbService from "./services/db-service";
import path from "path";
require("dotenv").config();



const app = express();
const server = http.createServer(app);

const corsParams = {
    origin: process.env.REACT_APP_HEROKU || "http://localhost:3000"
}

app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use(cors(corsParams));
app.use(express.static(path.join(__dirname, "../build")));

const io = new Server(server, {cors: corsParams});

(async() => {
    await dbService.createTables();
    ioServer(io);
})();

const PORT = process.env.PORT || 3001;
server.listen(PORT, ()=>{
    console.log("server running, ", PORT)
});
