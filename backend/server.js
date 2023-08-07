dotenv.config();
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleWare.js";

connectDB();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(cors());
app.get("/", (req, res) => {
  res.send("API is Running......");
});

//Product Routes
app.use("/api/products", productRoutes);

//User Routes
app.use("/api/users", userRoutes);

//Order Routes
app.use("/api/orders", orderRoutes);

//PayPal Route
app.get("/api/config/paypal", (req, res) =>
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
  })
);

// Upload Route
app.use("/api/upload", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
