const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const { db, auth } = require("../firebase/config");

router.post("/", async (req, res) => {
    try {      
        var name = "Guest"
        var profilePictureURL = "";
            try {
              const doc = await db.collection('users').doc(req.body.profileUid).get(); // should be uid not email
              if(doc.exists) {
                name = doc.data().firstName
                profilePictureURL = doc.data().profile_image
                console.log(name)
              } else {
                console.log("No such document")
              }
            } catch (error) {
              console.error(error)
            }   
        const userUid = await storeData(req.body.ratings, name, profilePictureURL, req.body.docUid);
        return res.send({ userUid: userUid });
    } catch (error) {
        return res.status(500).send({ error: "Error storing data " + error });
    }
})

async function storeData(ratings, name, profile_image, uid) {    
    try {
      console.log(uid)
      const docRef = await db.collection('bites').doc(uid).collection('ratings').add({
        name: name,
        profile_image: profile_image,
        ratings: ratings,
        timestamp: Date.now()
    })
    return docRef.id;
    } catch (error) {
      throw new Error("Couldn't add document: " + error);
    }
  }

module.exports = router;