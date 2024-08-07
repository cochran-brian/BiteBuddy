const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const { db, auth } = require("../firebase/config");
const authenticateMiddleware = require("../middleware/authenticateMiddleware");

// router.post("/", async (req, res) => {
//     try {      
//         var name = "Guest"
//         var profilePictureURL = "";
//             try {
//               const doc = await db.collection('users').doc(req.body.profileUid).get(); // should be uid not email
//               if(doc.exists) {
//                 name = doc.data().firstName
//                 profilePictureURL = doc.data().profile_image
//                 console.log(name)
//               } else {
//                 console.log("No such document")
//               }
//             } catch (error) {
//               console.error(error)
//             }   
//         const userUid = await storeData(req.body.ratings, name, profilePictureURL, req.body.docUid);
//         return res.send({ userUid: userUid });
//     } catch (error) {
//         return res.status(500).send({ error: "Error storing data " + error });
//     }
// })

router.post("/", async (req, res) => {
  try {      
    if(!req.body.guestName) {
      const { authorization } = req.headers;
      const idToken = authorization.split('Bearer ')[1];
      const decodedToken = await auth.verifyIdToken(idToken);

      const userSnapshot = await db.collection('users').doc(decodedToken.uid).get();
      const user = await userSnapshot.data()
      const doc = await storeData(req.body.ratings, user.firstName, req.body.doc, user.profile_image);
      return res.send({ doc: doc });
    } else {
      const doc = await storeData(req.body.ratings, req.body.guestName, req.body.doc, null);
      return res.send({ doc: doc });
    } 
  } catch (error) {
      return res.status(500).send({ error: "Error storing data " + error });
  }
})

async function storeData(ratings, name, uid, profile_image) {    
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