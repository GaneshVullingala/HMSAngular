import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConsultationService } from '../../services/consultation-service';
import { ConsultationModel } from '../../models/consultation.model';
import { DoctorCosnultationService } from '../../services/doctor-cosnultation-service';
import { Route } from '@angular/router';
@Component({
  selector: 'app-doctor-update-consultation',
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-update-consultation.html',
  styleUrl: './doctor-update-consultation.css'
})
export class DoctorUpdateConsultation implements OnInit {
   consultationId: number = 0;
   consultationData: ConsultationModel[] = [];

   constructor(private consultationService: DoctorCosnultationService, private route: ActivatedRoute) { }

   ngOnInit(): void {
    this.consultationId = Number(this.route.snapshot.paramMap.get('consultationId'));
      this.loadConsultationData();
   }

   loadConsultationData(): void {
      if (this.consultationId) {
         this.consultationService.getConsultationsById(this.consultationId).subscribe(
           {
            next: (data)=>{
              this.consultationData = [data];
            },
            error: (error) => {
              console.error('Error fetching consultation data:', error);
            }

           }
         );
      }
   }

}
