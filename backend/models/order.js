const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  qty: Number,
  size: String,
  color: String,
  blouse: Boolean,
  image: String,
}, { _id: false });

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  items: [orderItemSchema],
  amount: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  status: { type: String, default: "Processing" }, // Processing | Shipped | Delivered | Cancelled
  orderDate: { type: Date, default: Date.now },
  deliveryDate: Date,
});

module.exports = mongoose.model("Order", orderSchema);