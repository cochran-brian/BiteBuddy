const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();

const restaurants = require("./endpoints/restaurants");
const storage = require("./endpoints/storage");
const auth = require("./endpoints/auth")
const survey = require("./endpoints/survey")
const waiting = require("./endpoints/waiting")
const results = require("./endpoints/results")
const recents = require("./endpoints/recents")
const exit = require("./endpoints/exit")
const profile = require("./endpoints/profile")

app.use(cors());
app.use(express.json());

app.use("/restaurants", restaurants);
app.use("/storage", storage);
app.use("/auth", auth);
app.use("/survey", survey);
app.use("/waiting", waiting);
app.use("/results", results);
app.use("/recents", recents);
app.use("/exit", exit);
app.use("/profile", profile)

app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
