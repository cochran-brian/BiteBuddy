const express = require("express");
const router = express.Router();
const { db } = require('../firebase/config');

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const ratings = await getRatings(req.body.uid)
        console.log(ratings)
        // const data = await fetchData();
        // res.send({ data: data });
    } catch (error) {
        res.status(500).send({ error: error });
    }
})

const getRatings = async (uid) => {
    const querySnapshot = await db.collection('bites').doc(uid).collection('ratings').get().data();
    querySnapshot.forEach((doc) => {
        console.log(doc.data())
    })
    const restaurants = await db.collection('bites').doc(uid).collection('restaurants').get().data();
    console.log(restaurants)
}

const fetchData = async () => { // MAX RADIUS IS 25 MILES
    var data = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&radius=${radius}&sort_by=best_match&limit=10`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.YELP_API_KEY}`
        },
    })
    data = await data.json();
    console.log(data)
    return data;
}

module.exports = router;