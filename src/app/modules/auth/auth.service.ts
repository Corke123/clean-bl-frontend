import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse } from '../../shared/model/login-response.payload';
import { SignupRequestPayload } from '../../shared/model/signup-request.payload';
import { User } from '../../shared/model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient) {}

  signup(signupRequestPayload: SignupRequestPayload) {
    return this.http
      .post('http://localhost:8080/api/v1/auth/signup', signupRequestPayload, {
        responseType: 'text',
      })
      .pipe(catchError(this.handlerError));
  }

  login(username: string, password: string) {
    return this.http
      .post<LoginResponse>('http://localhost:8080/api/v1/auth/login', {
        username: username,
        password: password,
      })
      .pipe(
        catchError(this.handlerError),
        tap((resData) => {
          const user = new User(
            resData.authenticationToken,
            new Date(+resData.expiresAt * 1000),
            resData.username
          );
          this.user.next(user);
          this.autoLogout(
            new Date(+resData.expiresAt * 1000).getTime() - new Date().getTime()
          );
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  autoLogin() {
    let temp = JSON.parse(localStorage.getItem('userData'));

    if (!temp) {
      return;
    }
    const loadedUser: User = new User(
      temp._authenticationToken,
      temp.expiresAt,
      temp.username
    );

    if (loadedUser.authenticationToken) {
      this.user.next(loadedUser);
      this.autoLogout(
        new Date(loadedUser.expiresAt).getTime() - new Date().getTime()
      );
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handlerError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Neočekivana greška!';

    if (!errorRes.error || !errorRes.status) {
      return throwError(errorMessage);
    }

    if (errorRes.status === 403) {
      return throwError('Pogrešno korisničko ime ili lozinka.');
    }

    if (errorRes.status === 409) {
      switch (errorRes.error.message) {
        case 'Email is taken':
          errorMessage = 'E-mail je zauzet!';
          break;
        case 'Username is taken':
          errorMessage = 'Korisničko ime je zauzeto!';
          break;
      }
    }
    return throwError(errorMessage);
  }
}
