const express = require("express");
const router = express.Router();
const { db } = require("../firebase/config");

router.get("/", async (req, res) => {
    try {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
  
      // Send a comment to keep the connection open
      res.write(':ok\n\n');
  
      const unsubscribe = db.collection('bites').doc(uid).collection('ratings')
        .onSnapshot((querySnapshot) => {
          var names = [];
          querySnapshot.forEach((doc) => {
            names.push(doc.data().name);
          });
  
          console.log(names);
  
          // Send data to the client
          res.write(`data: ${JSON.stringify({ names })}\n\n`);
        });
  
      req.on('close', () => {
        console.log("Client closed SSE");
        // Unsubscribe from Firestore changes when the client disconnects
        unsubscribe();
        res.end();
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  });
  



module.exports = router;