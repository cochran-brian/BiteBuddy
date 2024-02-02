const express = require("express");
const router = express.Router();
const { db } = require("../firebase/config");
const authenticateMiddleware = require("../middleware/authenticateMiddleware");

router.use(authenticateMiddleware)

router.post("/", async (req, res) => {
    try {
        console.log(req.body.data)
        const { authorization } = req.headers;
        const idToken = authorization.split('Bearer ')[1];
        const uid = await storeData(req.body.data, req.body.latitude, req.body.longitude, req.body.radiu, idToken);
        return res.send({ uid: uid });
    } catch (error) {
        return res.status(500).send({ error: "Error storing data " + error });
    }
})

async function storeData(data, latitude, longitude, radius, token) {

    console.log(data)
    try {
      const docRef = await db.collection('bites').add({
        timestamp: Date.now(),
        search_radius: radius,
        host_latitude: latitude,
        host_longitude: longitude,
        host_id_token: token
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