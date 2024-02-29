const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const { db, auth } = require("../firebase/config");

router.post("/", async (req, res) => {
    try {      
        var name = "Guest"
        const { authorization } = req.headers;
        if (authorization.startsWith('Bearer ')) {
            const idToken = authorization.split('Bearer ')[1];
            try {
              const decodedToken = await admin.auth().verifyIdToken(idToken);
              const doc = await db.collection('users').doc(decodedToken.email).get();
              
            } catch (error) {
              console.error(error)
            }   
        }
        const userUid = await storeData(req.body.ratings, name, req.body.uid);
        return res.send({ userUid: userUid });
    } catch (error) {
        return res.status(500).send({ error: "Error storing data " + error });
    }
})

module.exports = router;