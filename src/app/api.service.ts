import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://127.0.0.1:8000/api'; // <-- replace with your API base URL

  constructor(private httpClient: HttpClient) { }

  get<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${endpoint}`);
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  // You can also add PUT, DELETE, etc. similar to above as per your requirement

}
