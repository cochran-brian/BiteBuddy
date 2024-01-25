const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const { db } = require("../firebase/config");

router.use((req, res, next) => {
    next();
})

// FINISH IMPORTING DB AND STORING USER DATA

router.post("/", async (req, res) => {
    try{
        console.log("Backend")
        const decodedToken = await validateFirebaseToken(req.body.firebaseToken);
        console.log("hello")
        const userId = decodedToken.uid;
        const userEmail = decodedToken.email;
        console.log(userId, userEmail);
        if(req.body.newUser){
            storeData(userId, userEmail, req.body.firstName);
        }
        const token = await customToken(userId);
        console.log(token)
        res.send({ token: token });
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

const customToken = async (uid) => {
    try {
        console.log("creating custom token...")
        const customToken = await admin.auth().createCustomToken(uid)
        return customToken;
    } catch (error) {
        console.error('Error creating custom token:', error);
        throw new Error('Custom token error');
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