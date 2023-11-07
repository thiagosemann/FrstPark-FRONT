import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodemcuService {
  private apiUrl = 'https://frst-back-02b607761078.herokuapp.com/nodemcu';  // Atualize o URL se necessário

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  }

  turnOnNodemcu(id: string): Observable<any> {
    const url = `${this.apiUrl}/on/${id}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  turnOffNodemcu(id: string): Observable<any> {
    const url = `${this.apiUrl}/off/${id}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  checkNodemcuStatus(id: string): Observable<any> {
    const url = `${this.apiUrl}/status/${id}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }
}
