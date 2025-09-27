import express from "express";
const app = express();
export default app;

import cors from "cors";
app.use(cors({ origin: "http://localhost:5173" }));
import getUserFromToken from "./middleware/getUserFromToken.js";

import usersRouter from "./api/users.js";
import eventsRouter from "./api/events.js";

app.use(express.json());
app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/events", eventsRouter);
