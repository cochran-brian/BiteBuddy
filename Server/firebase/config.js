const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const { getStorage } = require('firebase-admin/storage');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/u/0/project/bitebuddy-68060/firestore/data/',
  storageBucket: 'bitebuddy-68060.appspot.com'
});

const db = admin.firestore();
const auth = admin.auth();
const bucket = getStorage().bucket()

module.exports = { db, auth, bucket };