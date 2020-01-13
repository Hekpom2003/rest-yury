import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';

export interface LoginResponse {
  error: boolean;
  token: string;
  exp_in: number;
  is_admin: boolean;
  expirationTime?: string;
}

@Injectable({providedIn: 'root'})
export class SessionService {
  session$: BehaviorSubject<Partial<LoginResponse>> = new BehaviorSubject({});

  constructor(private http: HttpClient,
              private localStorage: LocalStorageService) {
  }

  login(credentials?) {
    return this.loginRequest(credentials)
      .pipe(
        tap((response: LoginResponse) => {
          this.localStorage.store('session', {...response, expirationTime: moment().add(response.exp_in, 'seconds').toISOString()});
          this.session$.next(response);
        })
      );
  }

  private loginRequest(credentials?) {
    const params = {
      login: '',
      password: '',
      method: 'authorize',
      company: '5dea62d620e91a13c99c0075',
      ...credentials
    };

    return this.http.post('', {...params});
  }

  logout() {
    this.session$.next({});
    this.localStorage.clear('session');
  }
}
