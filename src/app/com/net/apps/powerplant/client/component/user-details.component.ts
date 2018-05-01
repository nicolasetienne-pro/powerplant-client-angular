import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {LogService} from '../service/log.service';
import {User} from '../core/user';

@Component({
  selector: 'app-user-details',
  templateUrl: '../view/user-details/user-details.component.html',
  styleUrls: ['../view/user-details/user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {


  @Input() user: User;

  constructor(private userService: UserService,
              private logService: LogService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
