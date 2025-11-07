import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorAllConsultationsModel } from '../models/doctorallconsultations.model';
import { ConsultationModel } from '../models/consultation.model';
import { MedicineModel } from '../models/medicine.model';
import { UpdateConsultationModel } from '../models/updateconsultation.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorCosnultationService {
    private apiUrl = 'https://localhost:7239/api/Doctor/consultations';
    private pendingApiUrl = 'https://localhost:7239/api/Doctor/consultations/pending';
    private completedApiUrl = 'https://localhost:7239/api/Doctor/consultations/completed';
    private consultationByIdUrl = 'https://localhost:7239/api/General/consultation'; // Append /{id} for specific consultation
    private updateConsultationUrl = 'https://localhost:7239/api/Doctor/UpdateConsultation';
    private AllConsultInfoListByStatus = 'https://localhost:7239/api/Admin/consultations/status'

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

    updateConsultation(payload: {consultationDto: UpdateConsultationModel, prescription: MedicineModel[]}) : Observable<any>{
        return this.http.put<any>(this.updateConsultationUrl, payload);
    }

    getConsultInfoByStatus(status: string) : Observable<any[]>{
        const url = `${this.AllConsultInfoListByStatus}/${status}`;
        return this.http.get<any[]>(url);
    }
}
