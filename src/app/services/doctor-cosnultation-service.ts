import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorAllConsultationsModel } from '../models/doctorallconsultations.model';
@Injectable({
  providedIn: 'root'
})
export class DoctorCosnultationService {
    private apiUrl = 'https://localhost:7239/api/Doctor/consultations';
    constructor(private http: HttpClient) { }

    getConsultations() : Observable<DoctorAllConsultationsModel[]>{
        return this.http.get<DoctorAllConsultationsModel[]>(this.apiUrl);
    }
}
