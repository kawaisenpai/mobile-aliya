import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,  UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
   
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (localStorage.getItem("email")) {
      this.router.navigateByUrl("/seller");
      return false;
    }
    return true;
  }
}
