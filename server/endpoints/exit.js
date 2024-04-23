const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const { db, auth } = require("../firebase/config");

router.post("/", async (req, res) => {
    try {      
        const { authorization } = req.headers;
        if (authorization.startsWith('Bearer ')) {
            const idToken = authorization.split('Bearer ')[1];
            try {
              const decodedToken = await admin.auth().verifyIdToken(idToken);
              const doc = await db.collection('users').doc(decodedToken.uid).collection('bites').doc(Date.now().toString()).set({
                topRestaurant: req.body.topRestaurant,
                similarRestaurants: req.body.similarRestaurants,
                timestamp: Date.now()
              })
            } catch (error) {
              throw new Error(error);
            }   
        }

        try {
            await deleteCollection(db, `bites/${req.body.uid}/ratings`, 40)
            await deleteCollection(db, `bites/${req.body.uid}/restaurants`, 40)
            await db.collection('bites').doc(req.body.uid).delete();
        } catch(error) {
            throw new Error(error);
        }

        return res.send({ message: 'success' });
    } catch (error) {
        return res.status(500).send({ error: "Error storing data " + error });
    }

    
})

// iterates through each document in batches to delete a collection
// https://firebase.google.com/docs/firestore/manage-data/delete-data#node.js_2

async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}

module.exports = router;