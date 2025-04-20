import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json()); // allow us to receive request body json

app.get('/', (req, res) => {
  return res.send('Hello World!');
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Got Error : ', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.post('/api/products', async (req, res) => {
  const product = req.body;
  if (!product?.name || !product?.price || !product?.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all fields' });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Got Error : ', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: 'Product successfully deleted' });
  } catch (error) {
    console.error('Got Error : ', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    const newProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: 'Product successfully updated',
      data: newProduct,
    });
  } catch (error) {
    console.error('Got Error : ', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log('Server started at http://localhost:5000');
});
