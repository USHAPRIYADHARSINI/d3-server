import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import dashboardRouter from './routes/dashboardRoutes.js';
import userRouter from './routes/userRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL); // phone dial
// top-level await

await client.connect(); // call button
console.log("Mongo is connected ✌️😊");

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.use("/dashboard", dashboardRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log("server started on port : ", PORT));

export { client };