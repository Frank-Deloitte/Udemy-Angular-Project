import { Ingredient } from 'src/app/shared/ingredient.model';

export class Recipe {
  public recipeName: string;
  public recipeDescription: string;
  public recipeImagePath: string;
  public recipeIngredients: Ingredient[];

  constructor(
    name: string,
    desc: string,
    imagePath: string,
    ingredients: Ingredient[]
  ) {
    this.recipeName = name;
    this.recipeDescription = desc;
    this.recipeImagePath = imagePath;
    this.recipeIngredients = ingredients;
  }
}
