import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth.service';
import { AuthResponseModel } from './models/auth-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  isError: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) return null;

    this.isLoading = true;
    let authObservable: Observable<AuthResponseModel> = this.isLoginMode
      ? this.authService.login(authForm.value.email, authForm.value.password)
      : this.authService.singUp(authForm.value.email, authForm.value.password);

    authObservable.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.isError = errorMessage;
        this.isLoading = false;
        authForm.resetForm();
      },
    });
  }

  onCloseModal() {
    this.isError = null;
  }
}
