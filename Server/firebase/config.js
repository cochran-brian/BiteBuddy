const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/u/0/project/bitebuddy-68060/firestore/data/',
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };