"use strict";

const mongo = require("mongodb");

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback (err);
        }
        callback(null, tweets.sort(sortNewestFirst));
      })
    },

    // Using object identifer, increases like count of corresponding tweet
    // Calls the callback function to send tweet back to handler.
    likeTweets: function(id, callback) {
      const oid = new mongo.ObjectId(id)
      db.collection("tweets").update(
        { "_id": oid},
        { $inc: { "likes": 1 }}
      )
      db.collection("tweets").find( {"_id": oid }).toArray((err, tweet) => {
        if (err) {
          return callback (err);
        }
        //console.log(tweet)
        callback (null, tweet);
      })

      // call back (pass back to tweet.js)
    }

  }
}
