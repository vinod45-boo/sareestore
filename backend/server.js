const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Product = require("./models/product");

const app = express();

// ✅ CORS - allows React frontend to talk to backend
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ─────────────────────────────────────────
// GET all products
// ─────────────────────────────────────────
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// POST /products  (Route 1)
// ─────────────────────────────────────────
app.post("/products", async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;

    const product = new Product({ name, price, image, description, category });
    await product.save();

    res.json({
      success: true,
      message: "Product saved successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// POST /add-product  (Route 2)
// ─────────────────────────────────────────
app.post("/add-product", async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;

    const product = new Product({ name, price, image, description, category });
    await product.save();

    res.json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// POST /create-order (Razorpay - kept for future)
// ─────────────────────────────────────────
app.post("/create-order", async (req, res) => {
  try {
    // Razorpay integration goes here when ready
    res.json({ success: true, message: "Order route ready" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// ─────────────────────────────────────────
// DELETE /products/:id
// ─────────────────────────────────────────
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// PUT /products/:id  (Edit product)
// ─────────────────────────────────────────
app.put("/products/:id", async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image, description, category },
      { new: true }
    );
    res.json({ success: true, message: "Product Updated", product: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
app.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server running on port 5000");
});