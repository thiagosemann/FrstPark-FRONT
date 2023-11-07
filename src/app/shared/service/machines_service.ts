import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Machine } from '../utilitarios/machines';  // atualize o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private apiUrl = 'https://frst-back-02b607761078.herokuapp.com/machines';

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  }

  getAllMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getMachineById(machineId: number): Observable<Machine> {
    const url = `${this.apiUrl}/${machineId}`;
    return this.http.get<Machine>(url, { headers: this.getHeaders() });
  }

  getMachinesByBuilding(buildingId: number): Observable<Machine[]> {
    const url = `${this.apiUrl}/building/${buildingId}`;
    return this.http.get<Machine[]>(url, { headers: this.getHeaders() });
  }

  createMachine(machine: Machine): Observable<Machine> {
    return this.http.post<Machine>(this.apiUrl, machine, { headers: this.getHeaders() });
  }
  
  updateMachineStatus(machineId: number, status: boolean): Observable<Machine> {
    const url = `${this.apiUrl}/${machineId}`;
    return this.http.put<Machine>(url, { is_in_use: status }, { headers: this.getHeaders() });
  }
}