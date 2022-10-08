import React, { useState } from "react";
import classes from "../edit-product/edit-product.module.scss";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import uploadImage from "assets/images/upload.svg";
import closeIcon from "assets/images/close.png";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "components/Spinner";
import API from "api";

const CreateProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    description:
      "Make gains. Build legacies. Functional shapes, sweat-wicking tech and durable soft material mean you can train with passion and power. And the revamped original Gymshark logo makes Legacy a timeless classic that’ll never let you down. All that’s left is for you to put in the work, and build your own legacy.",
    brand: "Gymshark",
    colors: [],
    price: "6000",
    gender: "male",
    category: "tanks",
    quantity: "5",
  });

  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductDetails({
      ...productDetails,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    });
  };

  const colors = ["black", "white", "blue"];

  const handleCheckbox = (event) => {
    const currentState = productDetails.colors;
    const itemIndex = currentState.indexOf(event.target.value);
    if (itemIndex > -1) {
      currentState.splice(itemIndex, 1);
    } else {
      currentState.push(event.target.value);
    }
    setProductDetails({ ...productDetails, colors: currentState });
  };

  const colorCheckboxes = colors.map((color, index) => {
    return (
      <div className={classes.radioWrapper} key={index}>
        <label htmlFor={color}>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </label>
        <input
          type="checkbox"
          id={color}
          onChange={handleCheckbox}
          value={color}
        />
      </div>
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    console.log("submitted");
    if (
      !productDetails.brand ||
      !productDetails.category ||
      !productDetails.colors.length ||
      !productDetails.name ||
      !productDetails.price ||
      !productDetails.quantity ||
      !productDetails.description ||
      !productDetails.gender
    ) {
      setSubmissionLoading(false);
      console.log("please complete all the fields");
      return;
    }
    console.log(productDetails);
    await API.post("/products",  productDetails )
      .then((res) => {
        setSubmissionLoading(false);
        console.log('res',res);
        console.log("product saved");
      })
      .catch((error) => {
        console.log(error);
        setSubmissionLoading(false);
      });
  };
  return (
    <div className={classes.editProduct}>
      <div className={classes.head}>
        <h3>Create Product</h3>{" "}
      </div>
      <form className={classes.productCard} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <div className={classes.inputWrapper}>
              <label htmlFor="">Product Name</label>
              <input type="text" name="name" onChange={handleChange} id="" />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <label htmlFor="">Gender</label>
            <div className={classes.genderContainer}>
              <div className={classes.radioWrapper}>
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  value="male"
                  name="gender"
                  onChange={handleChange}
                />
              </div>
              <div className={classes.radioWrapper}>
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  onChange={handleChange}
                  value="female"
                />
              </div>
              <div className={classes.radioWrapper}>
                <label htmlFor="unisex">Unisex</label>
                <input
                  value="unisex"
                  id="unisex"
                  type="radio"
                  name="gender"
                  onChange={handleChange}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div className={classes.inputWrapper}>
              <label htmlFor="">Description</label>
              <input
                type="text"
                name="description"
                value={productDetails.description}
                onChange={handleChange}
                id=""
              />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <label htmlFor="">Colors</label>
            <div className={classes.genderContainer}>{colorCheckboxes}</div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div className={classes.inputWrapper}>
              <label htmlFor="">Brand</label>
              <input
                type="text"
                name="brand"
                value={productDetails.brand}
                onChange={handleChange}
                id=""
              />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <FormControl fullWidth>
              <label htmlFor="" className="mb-1">
                Category
              </label>
              <Select
                size="small"
                sx={{ mt: 1 }}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    category: e.target.value,
                  })
                }
                value={productDetails.category}
              >
                <MenuItem value="shoes">Shoes</MenuItem>
                <MenuItem defaultValue="" value="shorts">
                  Shorts
                </MenuItem>
                <MenuItem defaultValue="" value="tanks">
                  Tanks
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={6}>
            <div className={classes.inputWrapper}>
              <label htmlFor="">Quantity</label>
              <input
                type="number"
                min={0}
                name="quantity"
                value={productDetails.quantity}
                onChange={handleChange}
                id=""
              />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div className={classes.inputWrapper}>
              <label htmlFor="">Price</label>
              <input
                type="number"
                min={0}
                name="price"
                value={productDetails.price}
                onChange={handleChange}
                id=""
              />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div className={classes.fileInputArea}>
              <input type="file" name="" id="" />
              <div className={classes.imageWrapper}>
                <img src={uploadImage} alt="upload" />
              </div>
              <div className={classes.content}>
                <h3>Drop or Select file</h3>
                <p>Drop files here or click browse thorough your machine</p>
              </div>
            </div>
            <div className={classes.filesPreview}>
              <div className={classes.imagePreview}>
                <div className={classes.closeIconWrapper}>
                  <img className={classes.closeIcon} src={closeIcon} alt="" />
                </div>
                <img
                  className={classes.fileImage}
                  src="https://minimal-assets-api.vercel.app/assets/images/products/product_2.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className={classes.uploadButtons}>
              <button type="button">
                {fileUploadLoading ? <Spinner /> : "Upload Files"}
              </button>
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className={classes.saveButtonWrapper}>
              <button className={classes.saveButton} type="submit">
                {submissionLoading ? <Spinner /> : "Create"}
              </button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProduct;
