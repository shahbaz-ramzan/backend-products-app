const express = require('express');
// import express from 'express';
const app = express();
const port = 3000;
const mongoose = require('mongoose');

app.use(express.json()); // Middleware to parse JSON bodies
const Product = require("./model/product.model"); 
const cors = require('cors');
app.use(cors());


// MongoDB connection
mongoose.connect("mongodb+srv://ShahbazRamzan:vc3E7NU%23NhgCK77@first-db.qs2rb.mongodb.net/Node-API?retryWrites=true&w=majority&appName=First-DB")
  .then(() => {
    console.log('Connected!');
  })
  .catch((error) => {
    console.error("Connection failed!", error);
  });


// Create a new Product (POST)
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      data: product,
      message: "Product successfully created"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Products (GET)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a Product by ID (GET)
app.get('/api/products/:id', async (req, res) => {
  console.log("===id",req.params.id)
  try {
    const product = await Product.findById(req.params.id);
    console.log("products")
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Product by ID (PUT)
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({
      data: product,
      message: "Product successfully updated"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Product by ID (DELETE)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
