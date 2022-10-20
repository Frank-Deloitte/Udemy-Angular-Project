import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list-services/shopping-list.service';
import { Recipe } from '../recipes-models/recipe.model';

@Injectable()
export class RecipesService {
  recipesUpdated = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //     new Recipe(
  //         'Korean Fajitas',
  //         'This is a korean fajita',
  //         'https://blog.williams-sonoma.com/wp-content/uploads/2017/03/mar-29-Korean-Chicken-Fajitas-652x652.jpg',
  //         [
  //             new Ingredient('고추장 (gochujang)', 1),
  //             new Ingredient('Beef', 1.5),
  //             new Ingredient('Onion', 0.5),
  //             new Ingredient('Tomatoes', 1),
  //             new Ingredient('Peppers', 1.5),
  //         ]
  //     ),
  //     new Recipe(
  //         'Chinese Fajitas',
  //         'This is a chinese fajita',
  //         'https://blog.williams-sonoma.com/wp-content/uploads/2017/03/mar-29-Korean-Chicken-Fajitas-652x652.jpg',
  //         [
  //             new Ingredient('酱油 (Soy Sauce)', 1),
  //             new Ingredient('Beef', 1.5),
  //             new Ingredient('Onion', 0.5),
  //             new Ingredient('Tomatoes', 1),
  //             new Ingredient('Peppers', 1.5),
  //         ]
  //     ),
  //     new Recipe(
  //         'Japanese Fajitas',
  //         'This is a japanese fajita',
  //         'https://blog.williams-sonoma.com/wp-content/uploads/2017/03/mar-29-Korean-Chicken-Fajitas-652x652.jpg',
  //         [
  //             new Ingredient('照り焼きのたれ  (Teriyaki Sauce)', 1),
  //             new Ingredient('Beef', 1.5),
  //             new Ingredient('Onion', 0.5),
  //             new Ingredient('Tomatoes', 1),
  //             new Ingredient('Peppers', 1.5),
  //         ]
  //     ),
  //     new Recipe(
  //         'New York Fajitas',
  //         'This is a New York fajitas',
  //         'https://blog.williams-sonoma.com/wp-content/uploads/2017/03/mar-29-Korean-Chicken-Fajitas-652x652.jpg',
  //         [
  //             new Ingredient('照り焼きのたれ  (Teriyaki Sauce)', 1),
  //             new Ingredient('Beef', 1.5),
  //             new Ingredient('Onion', 0.5),
  //             new Ingredient('Tomatoes', 1),
  //             new Ingredient('Peppers', 1.5),
  //         ]
  //     ),
  //     new Recipe(
  //         'Empty Fajitas',
  //         'This is an imaginary fajita',
  //         'https://blog.williams-sonoma.com/wp-content/uploads/2017/03/mar-29-Korean-Chicken-Fajitas-652x652.jpg',
  //         []
  //     ),
  // ];

  constructor(private slService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  setRecipes(newRecipes: Recipe[]): void {
    this.recipes = newRecipes;
    this.recipesUpdated.next(this.getRecipes());
  }

  getRecipe(name: string): Recipe {
    return this.recipes.find((recipe) => recipe.recipeName === name);
  }

  addIngredientsToShoppingList(ingredientsList: Ingredient[]): void {
    this.slService.addToShoppingList(ingredientsList);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesUpdated.next(this.getRecipes());
  }

  updateRecipe(newRecipe: Recipe, index: number): void {
    this.recipes[index] = newRecipe;
    this.recipesUpdated.next(this.getRecipes());
  }

  deleteRecipe(name: string): void {
    this.recipes.splice(
      this.recipes.findIndex((value: Recipe) => value.recipeName === name),
      1
    );
    this.recipesUpdated.next(this.getRecipes());
  }
}
