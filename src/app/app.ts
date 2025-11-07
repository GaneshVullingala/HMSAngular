import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DoctorListComponent } from './Component/doctor-list.component/doctor-list.component';
import { ForntDesk } from './Component/fornt-desk/fornt-desk';
import { PatientComponent } from './Component/patient/patient';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { Route } from '@angular/router';
import { filter } from 'rxjs/operators'; // 
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, RouterOutlet,DoctorListComponent, ForntDesk, PatientComponent,CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
showNavbar = true

  protected readonly title = signal('TrainApp');

  private readonly hiddenNavbarRoutes: string[] = [
    '/login',
    '/unauthorized',
    '/register'
  ];

 constructor(private auth: AuthService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;
        this.showNavbar = !this.hiddenNavbarRoutes.some(route => currentUrl.startsWith(route));
        console.log('Route changed to:', currentUrl, 'Navbar visible:', this.showNavbar);
      });
  }
  closeOffcanvas(){
     const offcanvasEl = document.getElementById('offcanvasDarkNavbar');
      if (offcanvasEl) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl)
        || new bootstrap.Offcanvas(offcanvasEl);
      bsOffcanvas.hide();
    }
  }
 

  Logout(){
    this.auth.logout();
  }
  
}
