import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorAllConsultationsModel } from '../models/doctorallconsultations.model';
import { ConsultationModel } from '../models/consultation.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorCosnultationService {
    private apiUrl = 'https://localhost:7239/api/Doctor/consultations';
    private pendingApiUrl = 'https://localhost:7239/api/Doctor/consultations/pending';
    private completedApiUrl = 'https://localhost:7239/api/Doctor/consultations/completed';
    private consultationByIdUrl = 'https://localhost:7239/api/General/consultation/'; // Append /{id} for specific consultation

    constructor(private http: HttpClient) { }

    getConsultations() : Observable<DoctorAllConsultationsModel[]>{
        return this.http.get<DoctorAllConsultationsModel[]>(this.apiUrl);
    }

    getPendingConsultations() : Observable<DoctorAllConsultationsModel[]>{
        return this.http.get<DoctorAllConsultationsModel[]>(this.pendingApiUrl);
    }

    getCompletedConsultations() : Observable<DoctorAllConsultationsModel[]>{
        return this.http.get<DoctorAllConsultationsModel[]>(this.completedApiUrl);
    }

    getConsultationsById(id: number) : Observable<ConsultationModel>{
        const url = `${this.consultationByIdUrl}/${id}`;
        return this.http.get<ConsultationModel>(url);
    }
}
