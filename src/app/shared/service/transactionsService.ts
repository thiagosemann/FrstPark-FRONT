import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../utilitarios/transactions';  // Atualize o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiUrl = 'https://frst-back-02b607761078.herokuapp.com/transactions';  // Atualize o URL se necessário

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getTransactionById(id: number): Observable<Transaction> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Transaction>(url, { headers: this.getHeaders() });
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction, { headers: this.getHeaders() });
  }

  getTransactionByUsageHistoryId(usageHistoryID: number): Observable<Transaction> {
    const url = `${this.apiUrl}/${usageHistoryID}`;
    return this.http.get<Transaction>(url, { headers: this.getHeaders() });
  }
  
  deleteTransactionById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}