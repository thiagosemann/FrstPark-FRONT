import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Building } from '../utilitarios/buildings';  // atualize o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private apiUrl = 'https://frst-back-02b607761078.herokuapp.com/buildings';  // atualize o URL se necessário

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  }

  getAllBuildings(): Observable<Building[]> {
    return this.http.get<Building[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getBuildingById(id: number): Observable<Building> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Building>(url, { headers: this.getHeaders() });
  }

  createBuilding(building: Building): Observable<Building> {
    return this.http.post<Building>(this.apiUrl, building, { headers: this.getHeaders() });
  }
}