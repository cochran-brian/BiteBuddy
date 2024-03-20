const express = require("express");
const router = express.Router();
const { db } = require('../firebase/config');

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const topRestaurant = await getTopRestaurant(req.body.uid)
        console.log(topRestaurant)
        const similarRestaurants = await getSimilarRestaurants(topRestaurant, req.body.latitude, req.body.longitude, req.body.radius)
        console.log(similarRestaurants)
        return res.send({ topRestaurant: topRestaurant, similarRestaurants: similarRestaurants });
    } catch (error) {
        return res.status(500).send({ error: "Error getting results " + error });
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


    var columnSums = new Array(ratingsArr[0].length).fill(0);
    for(let i = 0; i < ratingsArr[0].length; i++) {
        for(let j = 0; j < ratingsArr.length; j++) {
            columnSums[i] += ratingsArr[j][i];
        }
    }
    console.log(columnSums)

    const indexOfMaxSum = columnSums.indexOf(Math.max(...columnSums));
    console.log(indexOfMaxSum)

    var restaurantsArr = [];

    const restaurantsQuerySnapshot = await db.collection('bites').doc(uid).collection('restaurants').get();
    restaurantsQuerySnapshot.forEach((doc) => {
        restaurantsArr.push(doc.data())
    })
    
    return restaurantsArr[indexOfMaxSum];
}

const getSimilarRestaurants = async (restaurant, latitude, longitude, radius) => {
    console.log("Getting similar restaurants...")
    console.log(restaurant.categories)
    // var categories = '';
    // for(let i = 0; i < restaurant.categories.length; i++) {
    //     if(i != restaurant.categories.length - 1) {
    //         categories += restaurant.categories[i].alias + ','
    //     } else {
    //         categories += restaurant.categories[i].alias
    //     }
    // }
    // console.log(categories)
        var data = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&radius=${Math.floor(radius)}&term=${restaurant.categories[0].alias}&sort_by=best_match&limit=10${restaurant.price ? `&price=${restaurant.price.length}` : ""}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.YELP_API_KEY}`
        },
    })
    
    data = await data.json();
    console.log(data)
    const filteredData = data.businesses.filter((business) => {
        return business.name !== restaurant.name;
    })
    return filteredData; // removes first element in array (aka the top restaurant)
}

module.exports = router;