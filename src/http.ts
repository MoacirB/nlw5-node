import express from "express";
import { createServer } from 'http';
import { routes } from './routes';
import { Server, Socket } from 'socket.io';
import path from 'path';
import './database';

const app = express();

//Usar html como views
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (req, res)=>{
    return res.render("html/client.html");
})

app.get("/pages/admin", (req, res)=>{
    return res.render("html/admin.html");
})

app.use(express.json());
app.use(routes);

const http = createServer(app);//Criando protocolo HTTP
const io = new Server(http);//Criando protocolo WS

io.on("connection", (socket: Socket)=>{
    // console.log("Se conectou",socket.id);
})

export { http, io };