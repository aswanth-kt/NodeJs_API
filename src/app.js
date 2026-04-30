import express from "express";
import "dotenv/config";
import session from "express-session";
import { userRegister } from "./controllers/user.controller.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true only in HTTPS (production)
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

// import routes
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);


export default app;