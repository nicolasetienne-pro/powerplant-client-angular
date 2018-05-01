import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {LogService} from '../service/log.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: '../view/login/login.component.html',
  styleUrls: ['../view/login/login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: ISubscription;

  public model: any = {};
  public loading = false;

  constructor(private router: Router,
              private userService: UserService,
              private logService: LogService) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public login(): void {
    this.loading = true;
    this.subscription = this.userService.loginUser1(this.model.username, this.model.password, 'response')
      .pipe(
        tap(_ => this.logService.log(`loginUser login=${this.model.username} password=*****`)),
        catchError(this.logService.handleError<any>('login'))
      )
      .subscribe(
        response => {
          this.loading = false;
          if (response.ok) {
            // let bearer = response.headers.get("Authorization");
            // this.userService.configuration.apiKeys = bearer;

            this.userService.configuration.accessToken = response.body.token;
            this.userService.configuration.username = this.model.username;
            // login successful
            this.router.navigate(['/']);

          } else {
            // Login failure
            //TODO log error message ??
            this.router.navigate(['login']);
          }
        }
      );
  }

  public logout(): void {
    if(this.userService.configuration.accessToken) {
      this.subscription = this.userService.logoutUser1()
        .pipe(
          tap((_) => this.logService.log(`logout`)),
          catchError(this.logService.handleError<any>('logout'))
        )
        .subscribe(
          () => {
            this.userService.configuration.accessToken = null;
            this.router.navigate(['/']);
          }
        );
    }
  }

}
