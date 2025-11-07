import { Component, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationService } from '../../services/consultation-service';
import { ConsultationModel } from '../../models/consultation.model';
import { MedicineModel } from '../../models/medicine.model';
import { DoctorCosnultationService } from '../../services/doctor-cosnultation-service';
import { UpdateConsultationModel } from '../../models/updateconsultation.model';
import { Route } from '@angular/router';  
import Swal from 'sweetalert2';
import { Pdfservice } from '../../services/pdfservice';
import { ViewChild } from '@angular/core';
import { PrescriptionComponent } from '../prescription/prescription';

@Component({
  selector: 'app-doctor-update-consultation',
  imports: [CommonModule, FormsModule, PrescriptionComponent],
  templateUrl: './doctor-update-consultation.html',
  styleUrls: ['./doctor-update-consultation.css']
})
export class DoctorUpdateConsultation implements OnInit {
    @ViewChild(PrescriptionComponent) pdfComponent!: PrescriptionComponent;
  
    consultationId: number = 0;
   medicinelist: MedicineModel[] = [];
   maxMedicines: number = 5;  
   updateConsultationData!: UpdateConsultationModel;
   consultationData!: ConsultationModel; 

   constructor(private consultationService: DoctorCosnultationService, private route: ActivatedRoute, private router: Router, private pdfservice: Pdfservice) { }

   ngOnInit(): void {
    this.consultationId = Number(this.route.snapshot.paramMap.get('consultationId'));
      this.loadConsultationData();
   }

   loadConsultationData(): void {
      if (this.consultationId) {
         this.consultationService.getConsultationsById(this.consultationId).subscribe(
           {
            next: (data)=>{
              this.consultationData = data;
            },
            error: (error) => {
              console.error('Error fetching consultation data:', error);
            }

           }
         );
      }
   }



   createEmptyMedicine(): MedicineModel{
    return {
     MedicineName: '',
     isMrngMedicine: false,
     isANoonMedicine: false,
     isNightMedicine: false,
     MedicineQuantity: 1
    };
   }

   removeMedicine(med: MedicineModel) {
    const index = this.medicinelist.indexOf(med);
    if (index > -1) {
      this.medicinelist.splice(index, 1);
    }
   }

   addMedicine() {
    if (this.medicinelist.length < this.maxMedicines) {
      this.medicinelist.push(this.createEmptyMedicine());
    }
    else{
      alert(`You can add up to ${this.maxMedicines} medicines only.`);
    }
   }

  updateConsultation(){
    this.updateConsultationData = {
      consultId : this.consultationData.consultId,
      DoctorId : this.consultationData.doctorId,
      PatientId : this.consultationData.patientId,
      FrontDeskId: this.consultationData.frontDeskId,
      diognosis : this.consultationData.diognosis ,
      revisitDate : this.consultationData.revisitDate,
      advice: this.consultationData.advice,
      problem : this.consultationData.problem,
      CurrentStatus: 'Consultation Completed '

    }

    const payload = {
      consultationDto: this.updateConsultationData,
      prescription: this.medicinelist
    };
     this.consultationService.updateConsultation(payload).subscribe({
      next: (data)=>{
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfully',
          text: 'Consultation updated successfully.',
          confirmButtonText: 'OK'
        }).then(()=>{
          this.router.navigate(['/doctors/consultations']);
        })
        
      },
      error: (error)=>{
        console.error('Error updating consultation:', error);
        alert('Failed to update consultation. Please try again.');
      } 
     })
  }
 
}
