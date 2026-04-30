import app from "./app.js";
import "dotenv/config";
import connectDB from "./db/db.js";


const port = process.env.PORT || 7000;

connectDB();

app.listen(port, () => {
  console.log("Server running port ", port);
})
