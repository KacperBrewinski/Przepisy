const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment'); // Import klasy Comment
let recipes = [];

exports.getRecipes = (req, res) => {
  res.render('recipes/list', { recipes });
};

exports.showAddForm = (req, res) => {
  res.render('recipes/add');
};

exports.addRecipe = (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const id = recipes.length + 1;
  const newRecipe = new Recipe(id, name, ingredients, instructions);
  recipes.push(newRecipe);
  res.redirect('/recipes');
};

exports.deleteRecipe = (req, res) => {
  const { id } = req.params;
  const recipeIndex = recipes.findIndex(r => r.id === parseInt(id));
  if (recipeIndex === -1) {
    res.status(404).send('Recipe not found');
  } else {
    recipes.splice(recipeIndex, 1);
    res.redirect('/recipes');
  }
};

exports.showEditForm = (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find(r => r.id === parseInt(id));
  if (!recipe) {
    res.status(404).send('Recipe not found');
  } else {
    res.render('recipes/edit', { recipe });
  }
};

exports.editRecipe = (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;
  const recipeIndex = recipes.findIndex(r => r.id === parseInt(id));
  if (recipeIndex === -1) {
    res.status(404).send('Recipe not found');
  } else {
    recipes[recipeIndex] = new Recipe(parseInt(id), name, ingredients, instructions);
    res.redirect('/recipes');
  }
};

exports.addRating = (req, res) => {
  const { recipeId } = req.query;
  const { rating } = req.body;

  const recipe = recipes.find(r => r.id === parseInt(recipeId));
  if (!recipe) {
    return res.status(404).send('Recipe not found');
  }

  recipe.rating = { value: parseFloat(rating) };

  res.redirect('/recipes');
};

exports.showAddCommentForm = (req, res) => {
  const { recipeId } = req.query;
  res.render('recipes/addComment', { recipeId });
};

exports.addComment = (req, res) => {
  const { recipeId, commentText } = req.body;

  const recipe = recipes.find(r => r.id === parseInt(recipeId));
  if (!recipe) {
    return res.status(404).send('Recipe not found');
  }

  if (!recipe.comments) {
    recipe.comments = [];
  }

  const newComment = new Comment(recipe.comments.length + 1, parseInt(recipeId), commentText);
  recipe.comments.push(newComment);

  res.redirect('/recipes');
};

