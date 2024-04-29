const express = require("express");
const authenticateMiddleware = require("../middleware/authenticateMiddleware");
const router = express.Router();
const { getDownloadURL } = require('firebase-admin/storage');
const { db, bucket } = require('../firebase/config');

router.use(authenticateMiddleware)

router.post("/", async (req, res) => {
    console.log(req.body);
    console.log(req.user)
    try {
        console.log(req.body.filePath)
        const fileRef = bucket.file(req.body.filePath);
        const downloadURL = await getDownloadURL(fileRef);
        console.log(downloadURL)
        db.collection("users").doc(req.body.uid).update({
            profile_image: downloadURL
        })
        console.log("updated profile")
        res.send({ pfp: downloadURL })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error });
    }
})

router.get("/:uid", async (req, res) => {
    try {
        console.log(req.params.uid)
        console.log(req.user)
        const userSnapshot = await db.collection('users').doc(req.params.uid).get();
        const user = await userSnapshot.data();
        res.send({ profile_image: user.profile_image, name: user.firstName, joinTime: user.timestamp })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error });
    }
})

module.exports = router;