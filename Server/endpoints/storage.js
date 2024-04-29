const express = require("express");
const router = express.Router();
const { db, auth } = require("../firebase/config");
const authenticateMiddleware = require("../middleware/authenticateMiddleware");

router.use(authenticateMiddleware)

router.post("/", async (req, res) => {
    try {
        const doc = await storeData(req.body.data, req.body.latitude, req.body.longitude, req.body.radius, req.user.uid);
        return res.send({ doc: doc });
    } catch (error) {
        return res.status(500).send({ error: "Error storing data " + error });
    }
})

async function storeData(data, latitude, longitude, radius, uid) {

    console.log(data)
    try {
      const docRef = await db.collection('bites').add({
        timestamp: Date.now(),
        search_radius: radius,
        latitude: latitude,
        longitude: longitude,
        host_uid: uid
      });
  
      await Promise.all(data.map(async (place) => {
        try {
          await docRef.collection('restaurants').doc(place.name).set(place);
        } catch (error) {
          throw new Error("Error adding subcollection " + error);
        }
      }));
  
      return docRef.id;
    } catch (error) {
      throw new Error("Couldn't add document: " + error);
    }
  }



module.exports = router;