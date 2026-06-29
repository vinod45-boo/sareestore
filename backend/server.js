const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/product");
const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});
//const razorpay = new Razorpay({
  //key_id: process.env.RAZORPAY_KEY_ID,
  //key_secret: process.env.RAZORPAY_SECRET
//});

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});
app.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json({
            success: true,
            message: "Product saved successfully",
            product,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});
app.post("/create-order", async (req, res) => {

    const options = {
        amount: 1000 * 100,
        currency: "INR",
        receipt: "receipt_1"
    };

    try {

        //const order = await razorpay.orders.create(options);

        //res.json(order);

    } catch (error) {

        res.status(500).send(error);

    }

});
app.post("/add-product", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.json({
            success: true,
            message: "Product Added Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});