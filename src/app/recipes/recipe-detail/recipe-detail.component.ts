import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipes-models/recipe.model';
import { RecipesService } from '../recipes-services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeDetails: Recipe;
  recipeNameRequest: string;
  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeNameRequest = params['name'];
      this.recipeDetails = this.recipesService.getRecipe(
        this.recipeNameRequest
      );
    });
  }

  onAddToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(
      this.recipeDetails.recipeIngredients
    );
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.recipeNameRequest);
    this.router.navigate(['/recipes']);
  }
}
