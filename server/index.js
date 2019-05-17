"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//  MongoDB setup.

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
      console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
  }

  console.log(`Connected to mongodb:x ${MONGODB_URI}`);

  // Passing the database to the database helper functions
  const DataHelpers = require("./lib/data-helpers.js")(db);

  // Passing the database helper functions to the routing functions
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix
  app.use("/tweets", tweetsRoutes);

  // Initialize local host
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

})
