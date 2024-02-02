import {
    onDocumentWritten,
    Change,
    FirestoreEvent
  } from "firebase-functions/v2/firestore";
  
const trackNames = onDocumentWritten("users/{userId}", (event) => {
// If we set `/users/marie` to {name: "Marie"} then
// event.params.userId == "marie"
// ... and ...
// event.data.after.data() == {name: "Marie"}
});

module.exports = trackNames;