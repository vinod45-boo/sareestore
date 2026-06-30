const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Product = require("./models/product");
const Order = require("./models/order");

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
// PRODUCTS
// ─────────────────────────────────────────
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;
    const product = new Product({ name, price, image, description, category });
    await product.save();
    res.json({ success: true, message: "Product saved successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/add-product", async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;
    const product = new Product({ name, price, image, description, category });
    await product.save();
    res.json({ success: true, message: "Product Added Successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

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
// ORDERS
// ─────────────────────────────────────────

// GET all orders (Admin Panel reads this)
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST a new order (called when customer completes checkout)
app.post("/orders", async (req, res) => {
  try {
    const { customerName, items, amount, address, city, deliveryDate } = req.body;
    const order = new Order({
      customerName,
      items,
      amount,
      address,
      city,
      deliveryDate,
      status: "Processing",
    });
    await order.save();
    res.json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update order status (Admin Panel dropdown calls this)
app.put("/orders/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ success: true, message: "Order status updated", order: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
app.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server running on port 5000");
});