import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CountService } from '../../services/count-service';
import { DoctorCosnultationService } from '../../services/doctor-cosnultation-service';
import { CommonModule } from '@angular/common';
import { DoctorAllConsultationsModel } from '../../models/doctorallconsultations.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard-component.html',
  styleUrls: ['./admin-dashboard-component.css']
})
export class AdminDashboardComponent implements OnInit {
  selectedStatus = 'All'; 
  ConsultationsLists : any[] = []; 
   
   allCounts = {
    totalDoctors: 0,
    totalPatientRegistered: 0,
    totalFrontDesks: 0,
    allConsultations: 0,
    pendingConsultations: 0,
    completedConsultations: 0,
    totalFeeCollected : 0,
    totalProfit : 0 
  };
   

  constructor(private CountService: CountService, private ConsultationService: DoctorCosnultationService){}

  ngOnInit(): void {
    this.loadCounts();
    this.getConsultationsByStatus('All');
  }

  loadCounts(){
    this.CountService.getAllCounts().subscribe({
      next: (data)=>{
        this.allCounts = data;
      }
      ,
      error: (err)=>{
        console.log('failed to load counts');
        console.log(err);
      }
    });

  }

  getConsultationsByStatus(status: string){
    this.selectedStatus = status;
       this.ConsultationService.getConsultInfoByStatus(this.selectedStatus).subscribe({
        next: (res)=>{
          this.ConsultationsLists = res;
        },
        error: (err)=>{
          console.log('failed to load all consultations');
          console.log(err);
        }
       });
  }
}
