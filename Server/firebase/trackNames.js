import {
    onDocumentWritten,
    Change,
    FirestoreEvent
  } from "firebase-functions/v2/firestore";
  
const trackNames = (uid) => onDocumentWritten(`bites/${uid}/ratings/{name}`, (event) => {
    console.log(event.params.name)
});

module.exports = trackNames;