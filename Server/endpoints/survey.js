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
              if(doc.exists) {
                name = doc.data().firstName
                console.log(name)
              } else {
                console.log("No such document")
              }
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

async function storeData(ratings, name, uid) {    
    try {
      console.log(uid)
      const docRef = await db.collection('bites').doc(uid).collection('ratings').add({
        name: name,
        ratings: ratings,
        timestamp: Date.now()
    })
    return docRef.id;
    } catch (error) {
      throw new Error("Couldn't add document: " + error);
    }
  }

module.exports = router;