import { Injectable, OnInit } from '@angular/core';
import { frontdesk } from '../models/frontdesk.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForntDesk } from '../Component/fornt-desk/fornt-desk';
import { ConsultationModel } from '../models/consultation.model';


@Injectable({
  providedIn: 'root'
})
export class FrontdeskService  {
   private apiUrl = 'https://localhost:7239/api/Admin/frontdesk';
   private consultUrl = 'https://localhost:7239/api/FrontDesk/AddConsult';
   constructor(private http: HttpClient){}
   getFrontDesk() : Observable<frontdesk[]>{
    return this.http.get<frontdesk[]>(this.apiUrl)
   }

   addFrontdesk(frontdesk : any): Observable<any>{
    const formData = new FormData();

     // Append normal fields
    formData.append('fullName', frontdesk.fullName);
    formData.append('phone', frontdesk.phone);
    formData.append('email', frontdesk.email);
    formData.append('qualification', frontdesk.qualification);
    formData.append('speciality', frontdesk.speciality);
    formData.append('experience', frontdesk.experience.toString());
    formData.append('address', frontdesk.address);
    formData.append('pincode', frontdesk.pincode);

    //Append files if they exist
      if (frontdesk.photoImg) formData.append('photoImg', frontdesk.photoImg);
      if (frontdesk.docImg) formData.append('docImg', frontdesk.docImg);

        // Append URLs (optional)
      formData.append('photoImgUrl', frontdesk.photoImg ? frontdesk.photoImg.name : 'NoPhoto');
      formData.append('docImgUrl', frontdesk.docImg ? frontdesk.docImg.name : 'NoDoc');

      return this.http.post<any>(this.apiUrl, formData);
   }

   getFrontdeskById(id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/id/${id}`);
   }

    AddConsult(cosnult: any) : Observable<ConsultationModel[]>{
      return this.http.post<any>(this.consultUrl, cosnult);
    }
}
