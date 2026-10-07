import dotenv from "dotenv";
import express from "express";
import cors from 'cors'

import DB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import todosRouter from "./routes/todosRoutes.js"

dotenv.config();

const app = express();
const port = 3000;

DB();

app.use(cors())
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/todos",todosRouter)

app.get("/", (req, res) => {
    res.send("API is working");
});

app.listen(port, () => {
    console.log(`App is running on server ${port}`);
});