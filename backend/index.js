import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors"

const app = express();

//middleware for handling cors policies
//option 1 : Allow all origins with default of cors(*)
app.use(cors());
//option 2 : Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET, POST, PUT, DELETE"],
//     allowedHeaders: "Content-Type",
//   })
// );

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.send("Welcome to MERN stack world!");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Press Ctrl+C to stop the server");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
