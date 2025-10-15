import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import {  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);
   const router = inject(Router);
  const token = localStorage.getItem('hms_jwt');
  
    let cloned = req;
   if (token) {
    cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401) {
        auth.logout();
        router.navigate(['/unauthorized']);
      }
      return throwError(() => error);
    }
  ));
};
