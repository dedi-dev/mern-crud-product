import mongoose from 'mongoose';

const productScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      reqired: true,
    },
    price: {
      type: Number,
      reqired: true,
    },
    image: {
      type: String,
      reqired: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productScheme);

export default Product;
