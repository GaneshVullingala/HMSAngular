import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route : ActivatedRouteSnapshot) : boolean {
    const allowed = route.data['roles'] as string[] | undefined;
    const user = this.auth.getCurrentUser();
    if(!user){
        this.router.navigate(['/login']);
        return false;
    }
    if(!allowed || allowed.includes(user.role)){
        return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
