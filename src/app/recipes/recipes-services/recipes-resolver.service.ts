import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipes-models/recipe.model';
import { RecipesService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dsService: DataStorageService,
    private recipesService: RecipesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const storedRecipes = this.recipesService.getRecipes();
    if (storedRecipes.length === 0) {
      return this.dsService.fetchRecipes();
    } else {
      return storedRecipes;
    }
  }
}
