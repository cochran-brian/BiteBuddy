const express = require("express");
const router = express.Router();
const db = require("./firebase/config");
const { collection, setDoc, doc } = require('@firebase/firestore');

var code = 0;

router.use((req, res, next) => {
    next();
})

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const data = await fetchData(req.body.latitude, req.body.longitude, req.body.radius);
        await storeData(data, req.body.latitude, req.body.longitude, req.body.radius);
        res.send({ data: data, code: code });
    } catch (error) {
        res.send({ error : "Fetching or storing error: " + error });
    }
})

function generateCode() {
    return Math.floor(Math.random() * 10000);
}

async function fetchData(latitude, longitude, radius){
    var data = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+latitude+'%2C'+longitude+'&radius='+radius+'&type=restaurant&opennow=true&key='+process.env.GOOGLE_MAPS_API_KEY)
    data = await data.json();

    promises = await data.results.slice(0, 20).map(async (place) => {
        try{
        const imageResponse = await fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+place.photos[0].photo_reference+'&key='+process.env.GOOGLE_MAPS_API_KEY);
        var detailResponse = await fetch('https://maps.googleapis.com/maps/api/place/details/json?fields=website%2Cdelivery%2Cdine_in%2Creservable%2Cserves_beer%2Cserves_breakfast%2Cserves_brunch%2Cserves_lunch%2Cserves_dinner%2Cserves_vegetarian_food%2Cserves_wine%2Ctakeout&place_id='+place.place_id+'&key='+process.env.GOOGLE_MAPS_API_KEY);
        detailResponse = await detailResponse.json();
        detailResponse = detailResponse.result;
        return {
            name: place.name,
            address: place.vicinity, 
            rating: place.rating,
            price_level: place.price_level,
            delivery: detailResponse.delivery ? true : false,
            reservable: detailResponse.reservable ? true : false,
            takeout: detailResponse.takeout ? true : false,
            serves_breakfast: detailResponse.serves_breakfast ? true : false,
            serves_brunch: detailResponse.serves_brunch ? true : false,
            serves_lunch: detailResponse.serves_lunch ? true : false,
            serves_dinner: detailResponse.serves_dinner ? true : false,
            serves_vegetarian_food: detailResponse.serves_vegetarian_food ? true : false,
            serves_beer: detailResponse.serves_beer ? true : false,
            serves_wine: detailResponse.serves_wine ? true : false,
            website: detailResponse.website,
            image_url: imageResponse.url,
            place_id: place.place_id
            }
        } catch (error) {
        console.error(error);
        }
    });

    data = await Promise.all(promises);
    return data;
}

async function storeData(data, latitude, longitude, radius) {
    code = generateCode().toString();
    console.log(code);
    data.map(async (place) => {
        try {        
        const placesDocRef = doc(collection(db, code), 'places');
        await setDoc(placesDocRef, {
            survey_code: code,
            search_radius: radius,
            host_latitude: latitude,
            host_longitude: longitude,
            //host_email: auth.currentUser.email
        });

        const subcollectionRef = collection(placesDocRef, 'restaurants');
        const subDocRef = doc(subcollectionRef, place.name);
        await setDoc(subDocRef, place);

        } catch (error) {
        console.error(error);
        } 
    })
}

module.exports = router;