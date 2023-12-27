const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();

const fetchData = require("./fetchPlaceData")

app.use(cors());
app.use(express.json());

app.use("/fetchData", fetchData);

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening")
})
