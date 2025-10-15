import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { patient } from '../models/patient.model';
import { PatientVitals } from '../models/patientvital.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
    private apiUrl = 'https://localhost:7239/api/Admin/patient';
    private vitalUrl = 'https://localhost:7239/api/FrontDesk/AddPatientVitals';
    private vitalgetbyIdUrlo = 'https://localhost:7239/api/FrontDesk/PatientVitals'
    constructor(private http: HttpClient){}
    getPatients() : Observable<patient[]>{
      return this.http.get<patient[]>(this.apiUrl)
    }

    getPatientsById(Id: number) : Observable<patient[]>{
      return this.http.get<patient[]>(this.apiUrl)
    }

    postPatientVitals(patientvital: any): Observable<PatientVitals[]>{
      return this.http.post<any>(this.vitalUrl, patientvital)
    }
    getPatientVitalsById(patientId: number): Observable<PatientVitals> {
        return this.http.get<any>(`https://localhost:7239/api/FrontDesk/PatientVitals/${patientId}`);
      }
  }
