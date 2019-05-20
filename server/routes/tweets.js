"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  // Routing for loading tweets on page
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  // Routing for posting new tweets
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likes: 0
    };

    // Saving new tweets to database
    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });

  });

 // Routing for like request; receives id and calls function to update database.
 // Callback in data function sends updated like count back to front end.
  tweetsRoutes.post('/likes/:id', function(req, res) {
    let id = req.params.id;
    DataHelpers.likeTweets(id, (err, tweet) => {
      if (err) {
        res.status(400).json({error : err.message})
      } else {
        // Sending the updated likes count back to the front-end
        res.json(tweet[0]['likes'])
      }
    })

  });


  return tweetsRoutes;

}
