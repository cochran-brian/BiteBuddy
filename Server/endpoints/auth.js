const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');

router.use((req, res, next) => {
    next();
})

router.post("/", async (req, res) => {
    console.log("in backend")
    const { userId, userEmail } = validateFirebaseToken(req.body.firebaseToken);
    storeData(userId, userEmail);
    const token = customToken(userId);
    res.send({ token: token });
});

const validateFirebaseToken = async (firebaseToken) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
        // Access user information from decodedToken
        const userId = decodedToken.uid;
        const userEmail = decodedToken.email;
        // Perform additional checks if needed

        return { userId, userEmail };
    } catch (error) {
        console.error('Error validating Firebase token:', error);
        res.status(500).send({ error: 'Invalid Firebase token' });
    }
}

const customToken = (uid) => {
    admin.auth()
    .createCustomToken(uid)
    .then((customToken) => {
        return customToken;
    })
  .catch((error) => {
    console.error('Error creating custom token:', error);
  });
}

const storeData = async (uid, email) => {
    try {
        await addDoc(collection(db, 'users'), {
        userId: uid,
        userEmail: email
        });
    } catch (error) {
        res.status(500).send({ error: 'Error adding user', error });
    }
}

module.exports = router;