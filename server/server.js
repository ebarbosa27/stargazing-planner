import app from "./app.js";

const PORT = process.send.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Listenting on port ${PORT}.`);
});
