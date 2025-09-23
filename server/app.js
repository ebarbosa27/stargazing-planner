import express from "express";
const app = express();
export default app;

import usersRouter from "./api/users.js";
import getUserFromToken from "./middleware/getUserFromToken.js";

app.use(express.json());
app.use(getUserFromToken);

app.use("/users", usersRouter);
