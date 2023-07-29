import express from "express";
import dotenv from "dotenv";
import products from "./data/product.js";
import cors from "cors";

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.get("/", (req, res) => {
  res.send("API is Running......");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
