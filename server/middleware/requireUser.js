export default async function requireUser(req, res, next) {
  if (!req.user) {
    // user is not found so send 401 code
    return res.status(401).send("Unauthorized");
  }
  next();
}
