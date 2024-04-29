const express = require("express");
const router = express.Router();
const { db } = require("../firebase/config");
const authenticateMiddleware = require("../middleware/authenticateMiddleware");

// router.use(authenticateMiddleware)

router.get("/", async (req, res) => {
    try {
      console.log(req.query.doc)
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
  
      // Send a comment to keep the connection open
      res.write(':ok\n\n');
  
      const unsubscribe = db.collection('bites').doc(req.query.doc).collection('ratings')
        .onSnapshot((querySnapshot) => {
          var names = [];
          querySnapshot.forEach((doc) => {
            names.push(doc.data().name);
          });
          res.write(`data: ${JSON.stringify({ names })}\n\n`);
        });
  
      req.on('close', () => {
        console.log("Client closed SSE");
        unsubscribe();
        res.end();
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  });

module.exports = router;