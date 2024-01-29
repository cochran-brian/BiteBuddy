const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const { db } = require("../firebase/config");

router.use((req, res, next) => {
    next();
})

router.post("/", async (req, res) => {
    try{
        const decodedToken = await validateFirebaseToken(req.body.firebaseToken);
        const userId = decodedToken.uid;
        const userEmail = decodedToken.email;
        console.log(userId, userEmail);
        if(req.body.newUser){
            storeData(userId, userEmail, req.body.firstName);
        }
        res.status(200).send({ message: "User is validated"} )
    } catch(error) {
        res.status(500).send({ error: error });
    }    
});

const validateFirebaseToken = async (firebaseToken) => {
    try {
        console.log("validating firebase token...")
        console.log(firebaseToken);
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken)
        console.log(decodedToken)
        return decodedToken;
    } catch (error) {
        console.error('Error validating Firebase token:', error);
        throw new Error('Invalid Firebase token');
    }
}

const storeData = async (uid, email, firstName) => {
    try {
        console.log("storing data...")
        db.collection("users").doc(email).set({
            userId: uid,
            firstName: firstName,
            userEmail: email
        })
        console.log("User stored successfully")
    } catch (error) {
        console.error("Error writing document: ", error);
        throw new Error('Error adding user');
    }
}

module.exports = router;