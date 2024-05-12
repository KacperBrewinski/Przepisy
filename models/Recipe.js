class Recipe {
  constructor(id, name, ingredients, instructions) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.comments = [];
    this.rating = null;
  }
}
module.exports = Recipe;