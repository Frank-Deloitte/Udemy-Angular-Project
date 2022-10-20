import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
import { RecipesService } from './recipes/recipes-services/recipes.service';
import { ShoppingListService } from './shopping-list/shopping-list-services/shopping-list.service';

@NgModule({
  providers: [
    ShoppingListService,
    RecipesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
