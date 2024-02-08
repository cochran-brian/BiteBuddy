const express = require("express");
const router = express.Router();
const { db } = require("../firebase/config");

router.post("/", async (req, res) => {
    try {

    } catch (error) {
    
    }
})

const getNames = () => {
    db.collection('bites').doc(uid).collection('ratings')
}

const listenForNames = () => {
    db.collection("cities")
    .onSnapshot((querySnapshot) => {
        var cities = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data().name);
        });
        console.log("Current cities in CA: ", cities.join(", "));
    });



    unsubscribe();

}

module.exports = router;