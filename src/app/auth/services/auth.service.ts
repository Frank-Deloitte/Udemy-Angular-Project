import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthResponseModel } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null);
  private API_KEY = environment.API_KEY;
  private tokenExpirationTimer: any;
  errorMessages = {
    EMAIL_EXISTS: 'The email address is already in use by another account.',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER:
      'We have blocked all requests from this device due to unusual activity. Try again later.',
    EMAIL_NOT_FOUND:
      'There is no user record corresponding to this identifier. The user may have been deleted.',
    INVALID_PASSWORD:
      'The password is invalid or the user does not have a password.',
    USER_DISABLED: 'The user account has been disabled by an administrator.',
  };

  private _errorMessageHandler(errorRes: HttpErrorResponse) {
    let errorMessage = new Error(
      'An unknow error ocurred!. Please try again later.'
    );

    if (
      !errorRes.error ||
      !errorRes.error.error ||
      !this.errorMessages[errorRes.error.error.message]
    ) {
      return throwError(() => errorMessage);
    }
    return throwError(
      () => new Error(this.errorMessages[errorRes.error.error.message])
    );
  }

  private _userAuthHandler(resData: AuthResponseModel) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+resData.expiresIn * 1000);
    this.user.next(user);
  }

  singUp(email: string, password: string) {
    return this.http
      .post<AuthResponseModel>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => this._errorMessageHandler(errorRes)),
        tap((resData) => this._userAuthHandler(resData))
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseModel>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => this._errorMessageHandler(errorRes)),
        tap((resData) => this._userAuthHandler(resData))
      );
  }

  logout() {
    this.user.next(null);
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return null;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.autoLogout(
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      );
      this.user.next(loadedUser);
    }
  }

  autoLogout(expirationTime: number) {
    console.log('time left', expirationTime);

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }
}
