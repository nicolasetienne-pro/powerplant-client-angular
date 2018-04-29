import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {LogService} from '../service/log.service';
import {User} from '../core/user';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: '../view/user/users.component.html',
  styleUrls: ['../view/user/users.component.css']
})
export class UsersComponent implements OnInit {
  model: User = {};
  loading: false;
  error = '';

  constructor(private userService: UserService,
              private router: Router,
              private logService: LogService) { }

  ngOnInit() {
  }

  createUser(): void {
    let user = {
      firstName:this.model.firstName,
      lastName: this.model.lastName,
      username: this.model.username
    } as User;

    this.userService.createUser1(user)
      .pipe(
        tap(_=> this.logService.log(`create User : ${user.username}`)),
        catchError(this.logService.handleError<User>(`create User : ${user.username}`)))
      .subscribe(
        _ =>{
          this.model = {};
          // Creation successful
          this.router.navigate(['/']);
      });
  }

  isAuthenticated(): boolean {
    return !!this.userService.configuration.accessToken;
  }

}
