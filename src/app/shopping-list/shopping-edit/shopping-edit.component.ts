import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list-services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) shoppingListForm: NgForm;

  editSubscription: Subscription;
  editMode: boolean = false;
  editIngredientIndex: number;
  editIngredient: Ingredient;

  constructor(private shoppingListSevice: ShoppingListService) {}

  ngOnInit(): void {
    this.editSubscription = this.shoppingListSevice.ingredientEdit.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editIngredientIndex = index;
        this.editIngredient = this.shoppingListSevice.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editIngredient.ingredientName,
          amount: this.editIngredient.ingredientAmount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, +form.value.amount);
    if (this.editMode) {
      this.shoppingListSevice.updateIngredient(
        this.editIngredientIndex,
        newIngredient
      );
    } else {
      this.shoppingListSevice.addNewIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(): void {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.shoppingListSevice.deleteIngredient(this.editIngredientIndex);
    this.onClear();
  }
}
