const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({ status: "success", data: savedProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error: "Something went wrong" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, rating } = req.query;
    let queryObject = {};

    if (category) {
      queryObject.category = category;
    }
    const allProducts = await Product.find(queryObject).sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      data: allProducts,
      productsCount: allProducts.length,
    });
  } catch (error) {
    res.status(400).json({ status: "error", error: "Something went wrong" });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { name } = req.query;
    let queryObject = {};
    if (name) {
      queryObject.name = { $regex: name, $options: "i" };
    }
    const products = await Product.find(queryObject).sort({ price: 1 });
    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findById(productID);
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProduct) {
      res
        .status(400)
        .json({ status: "error", error: "Product doesn't exists!" });
    }

    res.status(200).json({ status: "success", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
};

const deleteProduct = async (req, res) => {
  const { id: productID } = req.params;
  try {
    const product = await Product.findOneAndDelete({ _id: productID });
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", error: `No Product with id ${productID}` });
    }
    res.status(200).json({ status: "success", message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  getSingleProduct,
  deleteProduct,
  searchProducts
};
