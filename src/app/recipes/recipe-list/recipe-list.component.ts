import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes-services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesUpdateSub: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipesUpdateSub = this.recipesService.recipesUpdated.subscribe(
      (recipesList: Recipe[]) => {
        this.recipes = recipesList;
      }
    );
    this.recipes = this.recipesService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipesUpdateSub.unsubscribe();
  }
}
