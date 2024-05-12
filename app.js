const express = require('express');
const bodyParser = require('body-parser');
const recipeController = require('./controllers/recipeController');
const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.get('/recipes', recipeController.getRecipes);
app.get('/recipes/add', recipeController.showAddForm);
app.post('/recipes/add', recipeController.addRecipe);
app.get('/recipes/edit/:id', recipeController.showEditForm);
app.post('/recipes/edit/:id', recipeController.editRecipe);
app.post('/recipes/delete/:id', recipeController.deleteRecipe);
app.post('/recipes/addRating', recipeController.addRating);
app.post('/recipes/addComment', recipeController.addComment);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/recipes`);
});