import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-doctor-dashboard-component',
  imports: [],
  templateUrl: './doctor-dashboard-component.html',
  styleUrl: './doctor-dashboard-component.css'
})
export class DoctorDashboardComponent {

  constructor(private router: Router) {   }

  goToAllConsultations() {
    this.router.navigate(['/doctors/consultations']);
  }
}