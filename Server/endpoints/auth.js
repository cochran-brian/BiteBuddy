const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
require('../firebase/adminConfig');

router.use((req, res, next) => {
    next();
})

// FINISH IMPORTING DB AND STORING USER DATA

router.post("/", async (req, res) => {
    try{
        console.log("Backend")
        const { userId, userEmail } = validateFirebaseToken(req.body.firebaseToken);
        if(req.body.newUser){
            storeData(userId, userEmail, req.body.firstName);
        }
        const token = customToken(userId);
        res.send({ token: token });
    } catch(error) {
        res.status(500).send({ error: error });
    }    
});

const validateFirebaseToken = (firebaseToken) => {
    console.log("validating firebase token...")
    admin.auth().verifyIdToken(firebaseToken)
    .then((decodedToken) => {
        const userId = decodedToken.uid;
        const userEmail = decodedToken.email;
        return { userId, userEmail };
    })
    .catch((error) => {
        console.error('Error validating Firebase token:', error);
        throw new Error('Invalid Firebase token');
    })
}

const customToken = (uid) => {
    console.log("creating custom token...")
    admin.auth()
    .createCustomToken(uid)
    .then((customToken) => {
        return customToken;
    })
  .catch((error) => {
    console.error('Error creating custom token:', error);
    throw new Error('Custom token error');
  });
}

const storeData = async (uid, email, firstName) => {
    console.log("storing data...")
    db.collection("users").doc(email).set({
        userId: uid,
        firstName: firstName,
        userEmail: email
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
        throw new Error('Error adding user');
    });
}

module.exports = router;