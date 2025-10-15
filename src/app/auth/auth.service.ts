import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable, BehaviorSubject, map } from 'rxjs';

export interface AppUser {
  Genid: number;
  UserId: number
  name?: string;
  role: string;
  token: string;
  exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'hms_jwt';
  private currentUser$ = new BehaviorSubject<AppUser | null>(null);
  public CurrentUser = this.currentUser$.asObservable();
  constructor(private http: HttpClient) {
    const t = localStorage.getItem(this.tokenKey);
    if (t) 
      {
        const u = this.buildUserFromToken(t);
        if (u) this.currentUser$.next(u);
      }
  }

    login(username: string, password: string): Observable<AppUser> {
    return this.http.post<{ token: string }>('https://localhost:7239/api/Auth/login', { username, password })
      .pipe(map(res => {
        const token = res.token;
        localStorage.setItem(this.tokenKey, token);
        const u = this.buildUserFromToken(token)!;
        this.currentUser$.next(u);
        return u;
      }));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUser$.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): AppUser | null {
    return this.currentUser$.value;
  }

  private buildUserFromToken(token: string): AppUser | null{
    try{
      const payLoad = JSON.parse(atob(token.split('.')[1]));
      return{
        Genid: Number(payLoad.Genid ?? 0 ),
        UserId: Number(payLoad.UserId ?? 0),
        name: payLoad.Name ?? payLoad.unique_name ?? '',
        role: payLoad.role ?? payLoad.roles ?? payLoad['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? '',
        token: token,
        exp: payLoad.exp ? payLoad.exp * 1000 : undefined
      }
    } catch {
      return null;
    }

  }

  IsLoggedIn(): boolean {
    const u = this.currentUser$.value;
    if(!u) return false;
    if(u.exp && Date.now() > u.exp) { 
      this.logout();
      return false;
    }
    return true;
  }


}
