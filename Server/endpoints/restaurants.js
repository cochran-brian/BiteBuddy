const express = require("express");
const authenticateMiddleware = require("../middleware/authenticateMiddleware");
const router = express.Router();
const { db } = require('../firebase/config');

//router.use(authenticateMiddleware)

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        console.log(req.body.categories)
        console.log(req.body.priceLevel)
        var categories = '';
        if(req.body.categories){
            console.log("categories exist")
            for(let i = 0; i < req.body.categories.length; i++) {
                if(i != req.body.categories.length - 1) {
                    categories += req.body.categories[i] + ','
                } else {
                    categories += req.body.categories[i]
                }
            }
        }
        console.log("entering fetch")
        const data = await fetchData(req.body.latitude, req.body.longitude, Math.floor(req.body.radius), categories, req.body.priceLevel);
        console.log(data)
        res.send({ data: data });
    } catch (error) {
        console.error(error)
        res.status(500).send({ error });
    }
})

router.get("/:id", async (req, res) => {
    var restaurants = [];
    try {
        const restaurantsQuerySnapshot = await db.collection('bites').doc(req.params.id).collection('restaurants').get();
        restaurantsQuerySnapshot.forEach((doc) => {
            restaurants.push(doc.data());
        }) 

        const biteQuerySnapshot = await db.collection('bites').doc(req.params.id).get();
        const biteData = await biteQuerySnapshot.data();
        console.log(biteData)

        console.log(biteData.host_uid)

        const profileQuerySnapshot = await db.collection('users').doc(biteData.host_uid).get();
        console.log(profileQuerySnapshot)
        const profileData = await profileQuerySnapshot.data();
        console.log(profileData)
        
        res.send({ restaurants: restaurants, profile: profileData })
    } catch (error) {
        res.status(500).send({ error })
    }
})

const fetchData = async (latitude, longitude, radius, categories, priceLevel) => { // MAX RADIUS IS 25 MILES
    console.log("in fetch")
    console.log(categories)
    try {
        // var data = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&radius=${radius}&sort_by=best_match&limit=10&term=restaurants${categories ? `&categories=${categories}` : ""}${priceLevel ? `&price=${priceLevel}` : ""}`, {
        var data = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&radius=${radius}&sort_by=best_match&limit=10&term=${categories}${priceLevel ? `&price=${priceLevel}` : ""}`, {    
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.YELP_API_KEY}`
            },
        })
        data = await data.json();
        console.log(data)
        return data;
    } catch (error) {
        throw new Error(error)
    }
}

// async function fetchData(latitude, longitude, radius){
//     var data = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+latitude+'%2C'+longitude+'&radius='+radius+'&type=restaurant&opennow=true&key='+process.env.GOOGLE_MAPS_API_KEY)
//     data = await data.json();

//     promises = await data.results.slice(0, 20).map(async (place) => {
//         try{
//             const imageResponse = await fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+place.photos[0].photo_reference+'&key='+process.env.GOOGLE_MAPS_API_KEY);
//             var detailResponse = await fetch('https://maps.googleapis.com/maps/api/place/details/json?fields=website%2Cdelivery%2Cdine_in%2Creservable%2Cserves_beer%2Cserves_breakfast%2Cserves_brunch%2Cserves_lunch%2Cserves_dinner%2Cserves_vegetarian_food%2Cserves_wine%2Ctakeout&place_id='+place.place_id+'&key='+process.env.GOOGLE_MAPS_API_KEY);
//             detailResponse = await detailResponse.json();
//             detailResponse = detailResponse.result;
//             return {
//                 name: place.name,
//                 address: place.vicinity, 
//                 rating: place.rating,
//                 price_level: place.price_level,
//                 delivery: detailResponse.delivery ? true : false,
//                 reservable: detailResponse.reservable ? true : false,
//                 takeout: detailResponse.takeout ? true : false,
//                 serves_breakfast: detailResponse.serves_breakfast ? true : false,
//                 serves_brunch: detailResponse.serves_brunch ? true : false,
//                 serves_lunch: detailResponse.serves_lunch ? true : false,
//                 serves_dinner: detailResponse.serves_dinner ? true : false,
//                 serves_vegetarian_food: detailResponse.serves_vegetarian_food ? true : false,
//                 serves_beer: detailResponse.serves_beer ? true : false,
//                 serves_wine: detailResponse.serves_wine ? true : false,
//                 website: detailResponse.website,
//                 image_url: imageResponse.url,
//                 place_id: place.place_id
//             }
//         } catch (error) {
//             throw new Error(error);
//         }
//     });

//     data = await Promise.all(promises);
//     return data;
// }

module.exports = router;