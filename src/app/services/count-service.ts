import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  private apiUrl = 'https://localhost:7239/api/Admin/admincount';
  constructor(private http: HttpClient){}
  getAllCounts() : Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}
