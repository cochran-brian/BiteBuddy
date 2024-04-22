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
              var recents = [];
              const decodedToken = await admin.auth().verifyIdToken(idToken);
              const recentsQuerySnapshot = await db.collection('users').doc(decodedToken.email).collection("bites").get(); // needs to be uid not email
              recentsQuerySnapshot.forEach((doc) => {
                recents.push(doc.data());
              }) 
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