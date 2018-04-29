import {Injectable} from '@angular/core';
import {UserService} from '../service/user.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LogService} from '../service/log.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService,
              private logService: LogService) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): /*Observable<boolean> | Promise<boolean> |*/ boolean {
    if (this.userService.configuration.accessToken/*sessionStorage.getItem('currentUser')*/) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
