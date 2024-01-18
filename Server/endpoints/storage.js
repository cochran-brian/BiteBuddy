const express = require("express");
const router = express.Router();
const db = require("../firebase/config");
const { collection, setDoc, addDoc, doc } = require('@firebase/firestore');

router.use((req, res, next) => {
    next();
})

router.post("/", async (req, res) => {
    try {
        const uid = await storeData(req.body.data, req.body.latitude, req.body.longitude, req.body.radius);
        return res.send({ uid: uid });
    } catch (error) {
        return res.status(400).send({ message: "Error storing data " + error });
    }
})

async function storeData(data, latitude, longitude, radius) {

    let docRef;

    try {
        docRef = await addDoc(collection(db, 'bites'), {
            timestamp: Date.now(),
            search_radius: radius,
            host_latitude: latitude,
            host_longitude: longitude,
            //host_email: auth.currentUser.email
        });
    } catch (error) {
        throw new Error("Error adding doc: " + error);
    }

    data.map(async (place) => {
        try {        
            const subcollectionRef = collection(docRef, 'restaurants');
            const subDocRef = doc(subcollectionRef, place.name);
            await setDoc(subDocRef, place);
        } catch (error) {
            throw new Error("Error adding subcollection " + error);
        }     
    })

    return docRef.id;
}

module.exports = router;