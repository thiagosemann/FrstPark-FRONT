import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../utilitarios/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://frst-back-02b607761078.herokuapp.com';
  private users: User[] = [];
  private userListSubject: Subject<User[]> = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<User[]>(`${this.url}/users`, { headers });
  }

  addUser(user: User): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(`${this.url}/users`, user, { headers });
  }

  updateUserList(): void {
    this.getUsers().subscribe(users => {
      this.users = users;
      this.userListSubject.next(this.users); // Notifica os componentes sobre a atualização da lista
    });
  }

  getUserList(): User[] {
    return this.users;
  }

  getUserListObservable(): Observable<User[]> {
    return this.userListSubject.asObservable();
  }

  loadUserList(): Observable<User[]> {
    this.updateUserList();
    return this.getUserListObservable();
  }

  getUser(userId: number): Observable<User> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<User>(`${this.url}/users/${userId}`, { headers });
  }
  
  updateUser(user: User): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    const userId = user.id; // Assuming the User object has an 'id' property

    return this.http.put(`${this.url}/users/${userId}`, user, { headers });
  }

  getUsersByBuilding(buildingId: number): Observable<User[]> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<User[]>(`${this.url}/users/building/${buildingId}`, { headers });
  }
  
  deleteUser(userId: number): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.delete(`${this.url}/users/${userId}`, { headers });
  }
}
