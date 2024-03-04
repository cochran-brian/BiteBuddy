const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const { db, auth } = require("../firebase/config");

router.get("/", async (req, res) => {
    try {      
        const { authorization } = req.headers;
        if (authorization.startsWith('Bearer ')) {
            const idToken = authorization.split('Bearer ')[1];
            try {
              const decodedToken = await admin.auth().verifyIdToken(idToken);
              const recents = await db.collection('users').doc(decodedToken.email).collection("bites").get();
              console.log(recents);
              return res.send({ recents: recents });
            } catch (error) {
              throw new Error(error);
            }   
        }

        
    } catch (error) {
        return res.status(500).send({ error: "Error fetching recents data " + error });
    }
})

module.exports = router;