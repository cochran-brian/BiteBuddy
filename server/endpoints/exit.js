const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const { db, auth } = require("../firebase/config");

router.post("/", async (req, res) => {
    try {      
        const { authorization } = req.headers;
        if (authorization.startsWith('Bearer ')) {
            const idToken = authorization.split('Bearer ')[1];
            try {
              const decodedToken = await admin.auth().verifyIdToken(idToken);
              const doc = await db.collection('users').doc(decodedToken.email).collection('bites').doc(Date.now()).set({
                topRestaurant: req.body.topRestaurant,
                similarRestaurants: req.body.similarRestaurants,
                timestamp: Date.now()
              })
            } catch (error) {
              throw new Error(error);
            }   
        }

        try {
            await db.collection('bites').doc(req.body.uid).delete();
        } catch(error) {
            throw new Error(error);
        }

        return res.send({ message: 'success' });
    } catch (error) {
        return res.status(500).send({ error: "Error storing data " + error });
    }

    
})

module.exports = router;