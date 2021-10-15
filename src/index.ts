import express from "express";
import { Request, Response } from "express";
require('dotenv').config()
const app = express();

const port = Number(process.env.SERVER_PORT);
const hostname: string = process.env.SERVER_IP as string

app.get("/", (req: Request, res: Response) => {
	res.send({ data: "Hello World!" });
})

app.listen(port, hostname, () => {
	console.clear()
	console.log(`Server started at: http://${hostname}:${port}`)
})