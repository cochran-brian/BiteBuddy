const express = require("express");
const router = express.Router();
const db = require("../firebase/config");
const { collection, setDoc, doc } = require('@firebase/firestore');

router.use((req, res, next) => {
    next();
})

router.post("/", async (req, res) => {
    try {
        await storeData(req.body.data, req.body.latitude, req.body.longitude, req.body.radius);
        return res.send({ uid: uid });
    } catch (error) {
        return res.status(400).send({ message: error });
    }
})

async function storeData(data, latitude, longitude, radius) {

    let docRef;

    try {
        docRef = await addDoc(collection(db, 'bites'), {
            // include time stamp to order by date
            search_radius: radius,
            host_latitude: latitude,
            host_longitude: longitude,
            //host_email: auth.currentUser.email
        });
    } catch (error) {
        throw new Error(error);
    }

    data.map(async (place) => {
        try {        
            // const placesDocRef = doc(collection(db, code), 'places');
            // await setDoc(placesDocRef, {
            //     survey_code: code,
            //     search_radius: radius,
            //     host_latitude: latitude,
            //     host_longitude: longitude,
            //     //host_email: auth.currentUser.email
            // });

            

            // const subcollectionRef = collection(placesDocRef, 'restaurants');
            // const subDocRef = doc(subcollectionRef, place.name);
            // await setDoc(subDocRef, place);

            const subcollectionRef = collection(docRef, 'restaurants');
            const subDocRef = doc(subcollectionRef, place.name);
            await setDoc(subDocRef, place);

        } catch (error) {
            throw new Error(error);
        }     
    })

    return docRef.id;
}

module.exports = router;