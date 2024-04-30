const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// create a new product
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    category,
    brand,
    quantity,
    description,
    image,
    regularPrice,
    price,
    color,
  } = req.body;

  if (!name || !category || !brand || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // create product
  const product = await Product.create({
    name,
    sku,
    category,
    brand,
    quantity,
    description,
    image,
    regularPrice,
    price,
    color,
  });

  res.status(201).json(product);
});

// get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort("-created_at");
  res.status(200).json(products);
});

// get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

// delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Product deleted" });
});

// update a product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    quantity,
    description,
    image,
    regularPrice,
    price,
    color,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // now update the product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name,
      category,
      brand,
      quantity,
      description,
      image,
      regularPrice,
      price,
      color,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json(updatedProduct);
});

// Review Product
const reviewProduct = asyncHandler(async (req, res) => {
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;

  // validation
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add a star and review");
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // update rating
  product.ratings.push({
    star,
    review,
    reviewDate,
    name: req.user.name,
    nameID: req.user._id,
  });

  // save product
  product.save();

  res.status(200).json({ message: "Product review added successfully" });
});

// delete review
const deleteReview = asyncHandler(async (req, res) => {
  const { userID } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const newRatings = product.ratings.filter((rating) => {
    return rating.nameID.toString() !== userID.toString();
  });

  product.ratings = newRatings;
  product.save();
  res.status(200).json({ message: "Product review deleted" });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
};
