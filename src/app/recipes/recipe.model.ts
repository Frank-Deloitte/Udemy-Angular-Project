export class Recipe {
  public recipeName: string;
  public recipeDescription: string;
  public recipeImagePath: string;

  constructor(name: string, desc: string, imagePath: string) {
    this.recipeName = name;
    this.recipeDescription = desc;
    this.recipeImagePath = imagePath;
  }
}
