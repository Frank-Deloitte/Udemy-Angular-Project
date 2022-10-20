import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  public ingredientsUpdate = new Subject<Ingredient[]>();
  public ingredientEdit = new Subject<number>();

  private ingredients: Ingredient[] = [];

  public getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }

  public getIngredient(ingredientIndex: number): Ingredient {
    return this.ingredients[ingredientIndex];
  }

  public addNewIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsUpdate.next(this.getIngredients());
  }

  public addToShoppingList(listIngredients: Ingredient[]): void {
    this.ingredients.push(...listIngredients);
    this.ingredientsUpdate.next(this.getIngredients());
  }

  public updateIngredient(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
    this.ingredientsUpdate.next(this.getIngredients());
  }

  public deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsUpdate.next(this.getIngredients());
  }
}
