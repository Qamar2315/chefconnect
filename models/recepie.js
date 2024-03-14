// models/Recipe.js

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
    min: 0,
  },
  servings: {
    type: Number,
    required: true,
    min: 1,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String, // Optional field for categorizing recipes (e.g., "main course", "dessert")
  },
  tags: {
    type: [String], // Optional field for adding tags to recipes
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    default: []
  }]
});


const Recipe = mongoose.models?.Recipe || mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
