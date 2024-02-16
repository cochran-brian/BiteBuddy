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
    var ratingsArr = [];
    
    console.log("Getting ratings...")
    const ratingsQuerySnapshot = await db.collection('bites').doc(uid).collection('ratings').get();
    ratingsQuerySnapshot.forEach((doc) => {
        console.log(doc.data().ratings)
        ratingsArr.push(doc.data().ratings)
    })


    var columnSums = new Array(ratingsArr.length);
    for(let i = 0; i < ratingsArr[0].length; i++) {
        for(let j = 0; j < ratingsArr.length; i++) {
            columnSums[i] += ratingsArr[j][i];
        }
    }

    const indexOfMaxSum = columnSums.indexOf(Math.max(...columnSums));

    // const restaurantsQuerySnapshot = await db.collection('bites').doc(uid).collection('restaurants').get().where(id);
    // restaurantsQuerySnapshot.forEach((doc) => {
    //     console.log(doc.data())
    // })
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