const express = require("express");
const router = express.Router();
const { db } = require('../firebase/config');

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const topRestaurant = await getTopRestaurant(req.body.uid)
        console.log(topRestaurant)
        // const data = await fetchData();
        res.send({ data: "hi" });
    } catch (error) {
        res.status(500).send({ error: error });
    }
})

const getTopRestaurant = async (uid) => {
    var ratingsArr = [];
    
    console.log("Getting ratings...")
    const ratingsQuerySnapshot = await db.collection('bites').doc(uid).collection('ratings').get();
    ratingsQuerySnapshot.forEach((doc) => {
        console.log(doc.data().ratings)
        ratingsArr.push(doc.data().ratings)
    })
    console.log(ratingsArr)


    var columnSums = new Array(ratingsArr[0].length);
    for(let i = 0; i < ratingsArr[0].length; i++) {
        for(let j = 0; j < ratingsArr.length; j++) {
            columnSums[i] += (columnSums[i] || 0) + ratingsArr[j][i];
        }
    }
    console.log(columnSums)

    const indexOfMaxSum = columnSums.indexOf(Math.max(...columnSums));
    console.log(indexOfMaxSum)

    var restaurantsArr = [];

    const restaurantsQuerySnapshot = await db.collection('bites').doc(uid).collection('restaurants').get();
    console.log(doc.data())
    restaurantsQuerySnapshot.forEach((doc) => {
        console.log(doc.data())
        // restaurantsArr.push(doc.data())
    })
    console.log(restaurantsArr)

    return restaurantsArr[indexOfMaxSum];
}

// const getSimilarRestaurant = async (topRestaurant) => { // MAX RADIUS IS 25 MILES
//     var data = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&radius=${radius}&sort_by=best_match&limit=10`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.YELP_API_KEY}`
//         },
//     })
//     data = await data.json();
//     console.log(data)
//     return data;
// }

module.exports = router;