const express = require("express");
const router = express.Router();
const db = require("../firebase/config");
const { collection, setDoc, addDoc, doc } = require('@firebase/firestore');

router.use((req, res, next) => {
    next();
})

router.post("/:uid", async (req, res) => {
    const { uid } = req.params;
})