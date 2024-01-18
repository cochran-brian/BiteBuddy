const express = require("express");
const router = express.Router();
const db = require("../firebase/config");
const { collection, setDoc, addDoc, doc } = require('@firebase/firestore');

router.use((req, res, next) => {
    next();
})

router.get("/", async (req, res) => {
    // implement hybrid approach

    // // Example backend token validation using Firebase Admin SDK
    // const admin = require('firebase-admin');

    // const validateFirebaseToken = async (firebaseToken) => {
    // try {
    //     const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    //     // Access user information from decodedToken
    //     const userId = decodedToken.uid;
    //     const userEmail = decodedToken.email;
    //     // Perform additional checks if needed

    //     return { success: true, userId, userEmail };
    // } catch (error) {
    //     console.error('Error validating Firebase token:', error);
    //     return { success: false, error: 'Invalid Firebase token' };
    // }

    // // Example backend token generation using a library like jsonwebtoken
    // const jwt = require('jsonwebtoken');

    // const generateBackendToken = (userId, userEmail) => {
    // const secretKey = 'YOUR_SECRET_KEY'; // Replace with a secure secret key
    // const backendToken = jwt.sign({ userId, userEmail }, secretKey, { expiresIn: '1h' });

    // return backendToken;



    //     // Example middleware to verify backend token in Express.js
    // const jwt = require('jsonwebtoken');

    // const authenticateMiddleware = (req, res, next) => {
    // const backendToken = req.headers.authorization;

    // jwt.verify(backendToken, 'YOUR_SECRET_KEY', (err, decoded) => {
    //     if (err) {
    //     return res.status(401).json({ error: 'Invalid backend token' });
    //     }
    //     // Attach decoded user information to the request object
    //     req.user = decoded;
    //     next();
    // });
    // };

});


module.exports = router;