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
  selectedStatus = 'All';
  isloading = false;
  consultations: DoctorAllConsultationsModel[] = [];
  constructor(private consultationService: DoctorCosnultationService) { }

  ngOnInit(): void {
    this.getAllConsultationsByStatus('All');
  }

  getAllConsultationsByStatus(status: string){
    this.selectedStatus = status;
    this.consultations = [];
    this.isloading = true;
    if(status === 'All'){
       this.consultationService.getConsultations().subscribe({
          next: (result)=>{
            this.consultations = result;
            this.isloading = false;
          },
          error: (error)=>{
              this.isloading = false;
            console.error('Error fetching consultations:', error);
          }
      })
    }
    else if(status === 'completed'){
      this.consultationService.getCompletedConsultations().subscribe({
        next: (result)=>{
          
          this.consultations = result;
          this.isloading = false;
        },
        error: (error)=>{
          this.isloading = false;
          console.error('Error fetching consultations:', error);
        }
      })
    }
    else if(status === 'pending'){
      this.consultationService.getPendingConsultations().subscribe({
        next: (result)=>{
          this.consultations = result;
          this.isloading = false;
        },
        error: (error)=>{
          this.isloading = false;
          console.error('Error fetching consultations:', error);
        }
      })
    }
  }

  goDetailConsultation(consultation: DoctorAllConsultationsModel){
    
  }
}
