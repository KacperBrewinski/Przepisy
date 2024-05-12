const Comment = require('../models/Comment');

exports.showAddCommentForm = (req, res) => {
  const { recipeId } = req.query;
  res.render('recipes/addComment', { recipeId });
};

exports.addComment = (req, res) => {
  const { recipeId, text } = req.body;
  const newComment = new Comment(recipeId, text);
  res.redirect('/recipes');
};