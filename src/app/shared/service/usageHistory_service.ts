import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsageHistory } from '../utilitarios/usageHistory';

@Injectable({
  providedIn: 'root'
})
export class UsageHistoryService {
  private apiUrl = 'https://frst-back-02b607761078.herokuapp.com/usageHistory';
  //private apiUrl = 'http://localhost:3333/usageHistory';

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  }

  getUserUsageHistory(userId: number, month?: string): Observable<UsageHistory[]> {
    let url = `${this.apiUrl}/user/${userId}`;
    if (month) {
      url += `/${month}`;
    }
    return this.http.get<UsageHistory[]>(url, { headers: this.getHeaders() });
  }

  getMachineUsageHistory(machineId: number, month?: string): Observable<UsageHistory[]> {
    let url = `${this.apiUrl}/machine/${machineId}`;
    if (month) {
      url += `/${month}`;
    }
    return this.http.get<UsageHistory[]>(url, { headers: this.getHeaders() });
  }

  getAllUsageHistoryByBuildingAndMonth(buildingId: number, month?: string): Observable<UsageHistory[]> {
    let url = `${this.apiUrl}/${buildingId}`;
    if (month) {
      url += `/${month}`;
    }
    return this.http.get<UsageHistory[]>(url, { headers: this.getHeaders() });
  }
  

  createUsageHistory(usageHistory: UsageHistory): Observable<UsageHistory> {
    return this.http.post<UsageHistory>(this.apiUrl, usageHistory, { headers: this.getHeaders() });
  }

  updateUsageHistory(usageHistory: UsageHistory): Observable<UsageHistory> {
    const url = `${this.apiUrl}/${usageHistory.id}`;
    return this.http.put<UsageHistory>(url, usageHistory, { headers: this.getHeaders() });
  }
  
  deleteUsageHistoryById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}
