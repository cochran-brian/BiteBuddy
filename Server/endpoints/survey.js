const express = require("express");
const router = express.Router();
const { db } = require("../firebase/config");

router.post("/", async (req, res) => {
    try {
        var name = "";
        console.log(req.body.data)
        if(req.body.token) {
            const decodedToken = await validateFirebaseToken(req.body.firebaseToken);
            console.log(decodedToken)
            name = decodedToken.name;
        } else if (req.body.name) {
            name = req.body.name;
        } else {
            name = "Guest";
        }

        await storeData(req.body.ratings, name, req.body.uid);
        return res.send({ message: "Success" });
    } catch (error) {
        return res.status(500).send({ error: "Error storing data " + error });
    }
})

async function storeData(ratings, name, uid) {    
    try {
      await db.collection('bites').doc(uid).collection('ratings').doc(name).set({
        ratings: ratings,
        timestamp: Date.now()
    })
    } catch (error) {
      throw new Error("Couldn't add document: " + error);
    }
  }

module.exports = router;