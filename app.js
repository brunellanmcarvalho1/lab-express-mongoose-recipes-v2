const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const Recipe = require("./models/Recipe.model");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

app.post("/recipes", (req, res) => {
  Recipe.create(req.body)
    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      res.status(200).json(allRecipes);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.get("/recipes/:recipesId", (req, res) => {
  const { recipesId } = req.params;

  Recipe.findById(recipesId)
    .then((allRecipes) => {
      res.json(allRecipes);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.put("/recipes/:recipesId", (req, res) => {
  const { recipesId } = req.params;

  Recipe.findByIdAndUpdate(recipesId, req.body, { new: true })
    .then((updatedRecipe) => {
      res.status(201).json(updatedRecipe);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.delete("/recipes/:recipesId", (req, res) => {
  const { recipesId } = req.params;

  Recipe.findByIdAndDelete(recipesId)
    .then(() => {
      res.status(204).send;
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
