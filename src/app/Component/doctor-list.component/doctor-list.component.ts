import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
    doctorslist : Doctor[] = [];
    loading = true;
    error = '';
    showModal = false;
    saving = false;
    isEditMode = false;
    replacePhoto = false;
    replaceDoc = false;

     newDoctor = {
      doctorId: 0,
    fullName: '',
    phone: '',
    email: '',
    qualification: '',
    speciality: '',
    experience: 0,
    photoImg: 'string',
    docImg: 'string',
    photoImgUrl: 'NoPhoto',
    docImgUrl: 'NoDoc',
    address: '',
    pincode: ''
  };
   

    constructor(private doctorService : DoctorService){}

    ngOnInit(): void {
      this.loadDoctors();
      
    }

    loadDoctors(){
this.doctorService.getDoctors().subscribe({
        next: (data)=>{
          this.doctorslist = data;
          this.loading = false;
        },
        error: (err)=>{
          this.error = 'failed to load doctors';
          this.loading = false;
          console.log(err);
        }
      })
    }

    openModal() {
   this.showModal = true;
  this.isEditMode = false;
  this.replacePhoto = true;
  this.replaceDoc = true;
  this.resetForm();
  }

  closeModal() {
    this.showModal = false;
    this.isEditMode = false;
    this.replacePhoto = false;
    this.replaceDoc = false;
    this.resetForm();
    
  }

  resetForm(){
    this.newDoctor = {
      doctorId: 0,
      fullName: '',
      phone: '',
      email: '',
      qualification: '',
      speciality: '',
      experience: 0,
      photoImg: 'string',
      docImg: 'string',
      photoImgUrl: 'string',
      docImgUrl: 'string',
      address: '',
      pincode: ''
    };
  }

editDoctor(doctor: Doctor){
  this.isEditMode = true;
  this.replacePhoto = false;
this.replaceDoc = false;
  this.newDoctor = {
    doctorId : doctor.doctorId,
    fullName : doctor.fullName,
     phone : doctor.phone,
      email: doctor.email,
      qualification: doctor.qualification,
      speciality: doctor.speciality,
      experience: doctor.experience,
      photoImg: doctor.photoImgUrl,
      docImg: doctor.docImgUrl,
      photoImgUrl: doctor.photoImgUrl,
      docImgUrl: doctor.docImgUrl,
      address: doctor.address,
      pincode: doctor.pincode
  };
  this.showModal = true;
}


  onSubmit() {
    this.saving = true;
    const formData = new FormData();
        for (const key in this.newDoctor) {
            const field = key as keyof typeof this.newDoctor;
            const value = this.newDoctor[field];
            if (value !== null && value !== undefined) {
              formData.append(field, value as any);
            }
        }

        if (this.isEditMode){
           // ✅ Update API
            this.doctorService.updateDoctor(this.newDoctor.doctorId, formData).subscribe({
              next: (response) => {
                console.log('Doctor updated:', response);
                this.saving = false;
                this.closeModal();
                this.loadDoctors();
              },
              error: (err) => {
              this.saving = false;
              console.log('Error adding doctor:', err);
              alert('Failed to save doctor');
            }
            });
        }

        else{
    this.doctorService.addDoctors(this.newDoctor).subscribe({
      next: (Response)=>{
        console.log('Doctor Added:', Response);
        this.saving = false;
        this.closeModal();
        this.loadDoctors(); // reload table
      },
      error: (err) => {
        this.saving = false;
        console.log('Error adding doctor:', err);
        alert('Failed to save doctor');
      }
    })
    }
  }

  deleteDoctor(id: number) {
   Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
  }).then(result => {
    if (result.isConfirmed) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => {
          Swal.fire('Deleted!', 'Doctor has been removed.', 'success');
          this.loadDoctors();
        },
        error: () => {
          Swal.fire('Error!', 'Failed to delete doctor.', 'error');
        }
      });
    }
  });
}

  onFileSelected(event: any, type: 'photo' | 'doc') {
  const file = event.target.files[0];
  if (file) {
    if (type === 'photo') this.newDoctor.photoImg = file;
    else this.newDoctor.docImg = file;
  }
}

allowReplace(type: 'photo' | 'doc'){
 if (type === 'photo') {
    this.replacePhoto = true;
    this.newDoctor.photoImgUrl = '';
  } else {
    this.replaceDoc = true;
    this.newDoctor.docImgUrl = '';
  }
}



}
