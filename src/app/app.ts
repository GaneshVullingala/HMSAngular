import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DoctorListComponent } from './Component/doctor-list.component/doctor-list.component';
import { ForntDesk } from './Component/fornt-desk/fornt-desk';
import { PatientComponent } from './Component/patient/patient';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, RouterOutlet,DoctorListComponent, ForntDesk, PatientComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TrainApp');
  closeOffcanvas(){
     const offcanvasEl = document.getElementById('offcanvasDarkNavbar');
      if (offcanvasEl) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl)
        || new bootstrap.Offcanvas(offcanvasEl);
      bsOffcanvas.hide();
    }
  }
  constructor(private auth: AuthService) {}
  Logout(){
    this.auth.logout();
  }
}
