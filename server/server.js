import app from "./app.js";
import db from "./db/client.js";

const PORT = process.send.PORT ?? 3000;

await db.connect();

app.listen(PORT, () => {
  console.log(`Listenting on port ${PORT}.`);
});
