import { Component, OnInit } from '@angular/core';
import { FrontdeskService } from '../../services/frontdesk-service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { frontdesk } from '../../models/frontdesk.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fornt-desk',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fornt-desk.html',
  styleUrls: ['./fornt-desk.css']
})
export class ForntDesk implements OnInit {
    frontdeskList : frontdesk[] = [];
    loading = true;
    error = '';
    showModal = false;
    saving = false;

    newFrontDesk = {
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
    }
    
    constructor(private frontdeskservice : FrontdeskService){}

    ngOnInit(): void {
      this.getfrontDesks();
    }

    getfrontDesks(){
        this.frontdeskservice.getFrontDesk().subscribe({
          next : (data)=>{
            this.frontdeskList = data;
            this.loading = false;
          },
          error: (err)=>{
            this.error = 'failed to load frontdesk';
            this.loading = false;
            console.log(err);
          }
        })
    }

    openModal(){
      this.showModal = true;
    }

    closeModal(){
      this.showModal = false;
      this.newFrontDesk = {
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
      }
    }

    onSubmit(){
      this.saving = true;
      this.frontdeskservice.addFrontdesk(this.newFrontDesk).subscribe({
        next: (Response)=>{
          console.log('Frontdesk Added', Response);
          this.saving = false;
          this.closeModal();
          this.getfrontDesks();

        },
        error: (err)=>{
           this.saving = false;
          console.error('Error adding frontdesk:', err);
          alert('Failed to save frontdesk');
        }

      })
      
    }

    onFileSelected(event: any, type: 'photo' | 'doc'){
      const file = event.target.files[0];
      if(type === 'photo')this.newFrontDesk.photoImg = file;
      else{
        this.newFrontDesk.docImg = file;
      }
    }

    
}
