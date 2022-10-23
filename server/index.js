import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import thoughtRoutes from "./src/routes/thoughts-routes.js";
import userRoutes from "./src/routes/user-routes.js";
import cors from "cors";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
//body parser deals with the req.body
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/thoughts", thoughtRoutes);
app.use("/users", userRoutes);
app.use(cors());
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to Mongodb");
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
