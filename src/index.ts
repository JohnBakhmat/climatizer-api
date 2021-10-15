import express from "express";
import { Request, Response } from "express";

const app = express();
const port = 3011;
const hostname = "192.168.0.106"

app.get("/", (req: Request, res: Response) => {
	res.send({ data: "Hello World!" });
})

app.listen(port, hostname, () => {
	console.clear()
	console.log(`Server started at: http://${hostname}:${port}`)
})