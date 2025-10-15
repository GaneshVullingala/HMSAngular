import { Component , OnInit} from '@angular/core';
import { patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FrontdeskService } from '../../services/frontdesk-service';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from '../../auth/auth.service';

interface Doctor {
  doctorId: number;
  fullName: string;
}

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient.html',
  styleUrls: ['./patient.css']
})


export class PatientComponent implements OnInit {
    patientList : patient[] = [];
    doctors: Doctor[] = [];
    frontdeskMap: {[key: number]: string} = {}; // cache frontdesk names
    loading = true;
    saving = false;
    showvitalspopup = false;
    showConsultPopup = false; 
    isAddConsultMode = false;
    error = '';
    isEditMode = false;
    constructor(private patientService: PatientService, private frontdeskService: FrontdeskService, private doctorService: DoctorService, private authService: AuthService  ){}

    newPatinetVitals = {
      patientId: 0,
       bp: '',
       sugar: '',
        height: 0,
        weight: 0,
        spO2: 0
  }
  

   newConsult={
    ConsultId: 0,
      doctorId: 0,
      patientId: 0,
      currentStatus: '',
      fee: 0,
      diognosis: '',
      problem: '',
      advice: '',
      revisitDate: ''
   }


    ngOnInit(): void {
      // this.getPatients();
      this.loadFrontdesksAndPatients();
      this.loadDoctors();
    }

    loadDoctors(){
        this.doctorService.getDoctors().subscribe({
          next: (res)=>{
            this.doctors = res
          },
          error: (err)=>{
            console.log('Unable to load Doctors')
          }
        });
    }

    loadFrontdesksAndPatients(){
      this.loading = true;
      // Step 1: Load all frontdesks first
    this.frontdeskService.getFrontDesk().subscribe({
      next: (frontdesks) => {
        this.frontdeskMap = frontdesks.reduce((acc, f) => {
          acc[f.frontDeskId] = f.fullName || 'Unknown';
          return acc;
        }, {} as { [key: number]: string });

        // Step 2: Now load patients
        this.getPatients();
      },
      error: (err) => {
        console.error('Error loading frontdesks:', err);
        this.error = 'Failed to load frontdesks';
        this.loading = false;
      }
    });
    }

    getPatients(){
      this.patientService.getPatients().subscribe({
        next: (data)=>{
          this.patientList = data;
          this.loading = false;
        },
        error: (err)=>{
          this.error = 'failed to load patients';
          this.loading = false;
          console.log(err);
        }

      })
    }



    AddVitalsPopup(patientid: number){
        this.showvitalspopup = true;
          this.isEditMode = false;
            this.saving = false;
          // Check if patient already has vitals
          this.patientService.getPatientVitalsById(patientid).subscribe({
            next: (res) => {

              if (res) {
                this.newPatinetVitals = {
                   patientId: res.patientId,
                    bp: res.bp,
                    sugar: res.sugar,
                    height: res.height,
                    weight: res.weight,
                    spO2: res.spO2
                };
                this.isEditMode = true;
              } else {
                this.newPatinetVitals = {
                  patientId: patientid,
                  bp: '',
                  sugar: '',
                  height: 0,
                  weight: 0,
                  spO2: 0
                };
              }
            },
              error: (err) => {
      console.error('Error loading vitals:', err);
      // Still open empty modal for new entry
      this.newPatinetVitals = {
        patientId: patientid,
        bp: '',
        sugar: '',
        height: 0,
        weight: 0,
        spO2: 0
      };
    }

  });

         
    }

    onSubmitVitals(){
      this.saving = true;
      this.patientService.postPatientVitals(this.newPatinetVitals).subscribe({
        next : (res)=>{
          console.log('Vitals Added', res);
          this.saving = false;
          this.closeModal();
          this.getPatients();
        },
        error: (err)=>{
          this.saving = false;
          console.log(err);
          alert('Failed to add Patient Vitals');
        }
      })
    }

    onSubmitConsult(){
      this.showConsultPopup = false;
      this.frontdeskService.AddConsult(this.newConsult).subscribe({
        next : (res)=>{
          console.log('Case Added', res);
          this.closeModal();
          this.getPatients();
        },
        error: (err)=>{
          this.saving = false;
          console.log(err);
          alert('Failed to add assign Doctor');
        }
      })

    }
    AssignDoctorPopup(casepatient: patient){
      this.showConsultPopup = true;
      const loggedUser = this.authService.getCurrentUser();
      this.newConsult={
        ConsultId: 0,
        patientId : casepatient.patientId,
        // frontdeskId : loggedUser ? loggedUser.userId : 0,
        doctorId: 0,
        diognosis: '',
        problem: '',
        advice: '',
        currentStatus: 'Registered',
        fee: 0,
        revisitDate: new Date().toISOString()

      }

    }
    

    closeModal(){
        this.showvitalspopup = false;
        this.showConsultPopup = false;
    }
}
