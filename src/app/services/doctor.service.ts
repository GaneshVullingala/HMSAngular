import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'https://localhost:7239/api/Admin/doctor';
  constructor(private http: HttpClient){}
  getDoctors() : Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.apiUrl)
  }

  addDoctors(doctor : any): Observable<any>{
     const formData = new FormData();
   
  // Append normal fields
  formData.append('fullName', doctor.fullName);
  formData.append('phone', doctor.phone);
  formData.append('email', doctor.email);
  formData.append('qualification', doctor.qualification);
  formData.append('speciality', doctor.speciality);
  formData.append('experience', doctor.experience);
  formData.append('address', doctor.address);
  formData.append('pincode', doctor.pincode);

  // Append files if they exist
  if (doctor.photoImg) formData.append('photoImg', doctor.photoImg);
  if (doctor.docImg) formData.append('docImg', doctor.docImg);

  // Append URLs (optional)
  formData.append('photoImgUrl', doctor.photoImg ? doctor.photoImg.name : 'NoPhoto');
  formData.append('docImgUrl', doctor.docImg ? doctor.docImg.name : 'NoDoc');

  // Send as multipart/form-data
  return this.http.post<any>(this.apiUrl, formData);
  }

  updateDoctor(id: number, data: FormData) : Observable<any>{
      return this.http.put(`${this.apiUrl}/id/${id}`, data);
  }

  deleteDoctor(id: number){
    return this.http.delete(`${this.apiUrl}/id/${id}`);
  }

}
