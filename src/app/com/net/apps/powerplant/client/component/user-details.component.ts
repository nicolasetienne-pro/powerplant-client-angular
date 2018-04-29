import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {LogService} from '../service/log.service';
import {User} from '../core/user';
import {Observable} from 'rxjs/Observable';
import {catchError, share, tap} from 'rxjs/operators';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-user-details',
  templateUrl: '../view/user-details/user-details.component.html',
  styleUrls: ['../view/user-details/user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  users$: Observable<User[]>;
  currentUser$: Observable<User>;

  constructor(private userService: UserService,
              private logService: LogService) {
  }

  ngOnInit() {
    this.users$ = this.userService.getUsers1();
    let logMessage = `fetch current user info s login=${this.userService.configuration.username}`;

    this.currentUser$ =
      this.userService.getUserByName1(this.userService.configuration.username)
      .pipe(
        tap(_ => this.logService.log(logMessage)),
        catchError(this.logService.handleError<any>(logMessage))),
        share()
      // .subscribe(
      //   _user => {
      //     this.currentUser = _user;
      //   })
    ;
  }

  ngOnDestroy(): void {
  }

}
