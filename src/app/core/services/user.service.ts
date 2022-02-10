import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {Router} from '@angular/router';

import {ApiService} from '@app/core/services/api.service';
import {JwtService} from '@app/core/services/jwt.service';
import {User} from '@app/core/models/models-response/user.model';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable().pipe(distinctUntilChanged());

  storage: any = window.localStorage;
  sessionStorage: any = window.sessionStorage;

  readonly KEY: string = 'user-email';

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate(): boolean {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.token) {
      const user$ = this.apiService.get('api/profile');
      user$.toPromise().then(data => {
        if (data) {
          this.setAuth(data, this.jwtService.token);
          //  this.router.navigate(['main'], {replaceUrl: true});
          return true;
        } else {
          this.purgeAuth();
          this.router.navigate(['auth'], {replaceUrl: true});
          return false;
        }
      }).catch(() => {
          this.purgeAuth();
          this.router.navigate(['auth'], {replaceUrl: true});
          return false;
        }
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
      return false;
    }
    return false;
  }

  setAuth(user: User, token?: string) {
    //  Save JWT sent from server in localstorage
    // console.log(user);
    if (token) {
      this.jwtService.setToken(token);
    }

    // Set role
    this.storage.setItem(this.KEY, user.email);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, {user: credentials})
      .pipe(map(
        data => {
          this.setAuth(data.user);
          return data;
        }
      ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  isAuth(): boolean {
    return !!this.jwtService.token;
  }

  logout() {
    // if (this.isAuth()) {
    //   this.apiService.post('/logout.php', '').subscribe(res => {
    //     if (res) {
    //       this.purgeAuth(); // стирание куки и стримов
    //       this.router.navigate(['/'], {replaceUrl: true}); // редирект на главную
    //     }
    //
    //   });
    // }
    this.purgeAuth(); // стирание куки и стримов
    this.router.navigate(['/']); // редирект на главную
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
      .put('/user', {user})
      .pipe(map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      }));
  }

}
