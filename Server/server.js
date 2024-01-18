const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();

const fetchData = require("./endpoints/fetchPlaceData");
const storeRestaurants = require("./endpoints/storeRestaurants");

app.use(cors());
app.use(express.json());

app.use("/fetchData", fetchData);
app.use("/storeRestaurants", storeRestaurants);

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening")
})
