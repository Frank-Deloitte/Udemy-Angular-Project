import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggerService } from '../logger.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list-services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingredientsUpdateSub: Subscription;
  constructor(
    private shoppingListService: ShoppingListService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsUpdateSub =
      this.shoppingListService.ingredientsUpdate.subscribe(
        (newIngredients: Ingredient[]) => {
          this.ingredients = newIngredients;
        }
      );
    this.logger.printLog('Logging from Shopping List Component');
  }

  ngOnDestroy(): void {
    this.ingredientsUpdateSub.unsubscribe();
  }

  onSelectIngredient(index: number): void {
    this.shoppingListService.ingredientEdit.next(index);
  }
}
