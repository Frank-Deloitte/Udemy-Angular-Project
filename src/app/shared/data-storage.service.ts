import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { AuthService } from '../auth/services/auth.service';
import { Recipe } from '../recipes/recipes-models/recipe.model';
import { RecipesService } from '../recipes/recipes-services/recipes.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://udemy-angular-project-6f779-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://udemy-angular-project-6f779-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) =>
          recipes.map((recipe) => {
            return {
              ...recipe,
              recipeIngredients: recipe.recipeIngredients
                ? recipe.recipeIngredients
                : [],
            };
          })
        ),
        tap((recipes) => this.recipeService.setRecipes(recipes))
      );
  }
}
