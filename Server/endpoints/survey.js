const express = require("express");
const router = express.Router();
const { db, auth } = require("../firebase/config");

router.post("/", async (req, res) => {
    try {
        console.log(req.body.ratings)
        console.log(req.body.uid)
      
        const name = "Guest"
        // const { authorization } = req.headers;
        // if (authorization.startsWith('Bearer ')) {
        //     console.log(authorization)
        //     const idToken = authorization.split('Bearer ')[1];
        //     console.log(idToken)
        //     name = await auth.verifyIdToken(idToken);
        //     console.log(name)
        // }
        // console.log(name)

        const userUid = await storeData(req.body.ratings, name, req.body.uid);
        console.log(userUid);
        return res.send({ userUid: userUid });
    } catch (error) {
        return res.status(500).send({ error: "Error storing data " + error });
    }
})

async function storeData(ratings, name, uid) {    
    try {
      console.log(uid)
      const docRef = await db.collection('bites').doc(uid.uid).collection('ratings').add({
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