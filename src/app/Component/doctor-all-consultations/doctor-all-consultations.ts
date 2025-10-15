import { Component, OnInit } from '@angular/core';
import { DoctorAllConsultationsModel } from '../../models/doctorallconsultations.model'; 
import { DoctorCosnultationService } from '../../services/doctor-cosnultation-service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-all-consultations',
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-all-consultations.html',
  styleUrls: ['./doctor-all-consultations.css']
})
export class DoctorAllConsultations implements OnInit {
  allconsultationscount = 0;  
  consultations: DoctorAllConsultationsModel[] = [];
  constructor(private consultationService: DoctorCosnultationService) { }

  ngOnInit(): void {
    this.consultationService.getConsultations().subscribe({
      next: (result)=>{
        this.consultations = result;
        this.allconsultationscount = result.length;
      },
      error: (error)=>{
        console.error('Error fetching consultations:', error);
      }
    })
  }
}
