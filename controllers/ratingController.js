const Rating = require('../models/Rating');

exports.showAddRatingForm = (req, res) => {
  const { recipeId } = req.query;
  res.render('recipes/addRating', { recipeId });
};

exports.addRating = (req, res) => {
  const { recipeId, value } = req.body;
  const newRating = new Rating(recipeId, value);
  res.redirect('/recipes');
};