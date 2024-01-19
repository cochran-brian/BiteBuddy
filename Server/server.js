const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();

const restaurants = require("./endpoints/restaurants");
const storage = require("./endpoints/storage");
const auth = require("./endpoints/auth")

app.use(cors());
app.use(express.json());

app.use("/restaurants", restaurants);
app.use("/storage", storage);
app.use("/auth", auth);

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening")
})
