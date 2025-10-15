import 'zone.js'; 
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { tokenInterceptor } from './app/auth/token-interceptor';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor])), provideRouter(routes) // ✅ new way — replaces HttpClientModule
  ]
}).catch(err => console.error(err));