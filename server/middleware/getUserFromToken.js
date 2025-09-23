import { verifyToken } from "../utils/jwt.js";
import { getUserById } from "../db/queries/users.js";

export default async function getUserFromToken(req, res, next) {
  const authorization = req.get("authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) return next();

  const token = authorization.split(" ")[1];
  try {
    const { id } = verifyToken(token);
    req.user = await getUserById({ id });
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send("Invalid token.");
  }
}
