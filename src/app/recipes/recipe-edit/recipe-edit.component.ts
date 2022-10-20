import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipes-models/recipe.model';
import { RecipesService } from '../recipes-services/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeEditName: string;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeEditName = params['name'];
      this.editMode = params['name'] != null;
      this.initForm();
    });
  }

  private initForm(): void {
    let recipeInitializer: Recipe = new Recipe('', '', '', []);
    const recipeIngredient = new FormArray([]);

    if (this.editMode) {
      recipeInitializer = this.recipeService.getRecipe(this.recipeEditName);
      if (recipeInitializer['recipeIngredients']) {
        recipeInitializer.recipeIngredients.forEach((value: Ingredient) => {
          recipeIngredient.push(
            new FormGroup({
              ingredientName: new FormControl(
                value.ingredientName,
                Validators.required
              ),
              ingredientAmount: new FormControl(value.ingredientAmount, [
                Validators.required,
                Validators.pattern(
                  '^[1-9]+[0-9]*[.]?[0-9]*|[0-9]*[.][0-9]+[0-9]*$'
                ),
              ]),
            })
          );
        });
      }
    }
    this.recipeForm = new FormGroup({
      recipeName: new FormControl(
        recipeInitializer.recipeName,
        Validators.required
      ),
      recipeImagePath: new FormControl(
        recipeInitializer.recipeImagePath,
        Validators.required
      ),
      recipeDescription: new FormControl(
        recipeInitializer.recipeDescription,
        Validators.required
      ),
      recipeIngredients: recipeIngredient,
    });
  }

  onSubmit(): void {
    const recipeValues = this.recipeForm.value;
    // const newRecipe = new Recipe(
    //     recipeValues['name'],
    //     recipeValues['description'],
    //     recipeValues['imagePath'],
    //     recipeValues['ingredients']
    // );

    if (this.editMode) {
      const recipeIndex = this.recipeService
        .getRecipes()
        .findIndex((value: Recipe) => value.recipeName === this.recipeEditName);
      this.recipeService.updateRecipe(recipeValues, recipeIndex);
    } else {
      this.recipeService.addRecipe(recipeValues);
    }

    if (recipeValues['recipeName'] === this.recipeEditName) {
      this.onCancel();
    } else {
      this.onNewRecipeName();
    }
  }

  onNewRecipeName() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient(): void {
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(
      new FormGroup({
        ingredientName: new FormControl(null, Validators.required),
        ingredientAmount: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[1-9]+[0-9]*[.]?[0-9]*|[0-9]*[.][0-9]+[0-9]*$'),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number): void {
    (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt(index);
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('recipeIngredients')).controls;
  }
}
