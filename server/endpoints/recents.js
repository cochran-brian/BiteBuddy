const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const { db, auth } = require("../firebase/config");
const authenticateMiddleware = require("../middleware/authenticateMiddleware");

router.use(authenticateMiddleware)

router.get("/", async (req, res) => {
    try {
      const recentsQuerySnapshot = await db.collection('users').doc(req.user.uid).collection("bites").get(); // needs to be uid not email
      var recents = [];
      recentsQuerySnapshot.forEach((doc) => {
        recents.push(doc.data());
      }) 
      return res.send({ recents: recents });
    } catch (error) {
        return res.status(500).send({ error: "Error fetching recents data " + error });
    }
})

module.exports = router;