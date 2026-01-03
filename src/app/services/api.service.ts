import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: HttpParams | { [param: string]: string | string[] }, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(url, { params, headers });
  }

  getWithResponse<T>(url: string, params?: HttpParams | { [param: string]: string | string[] }, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.http.get<T>(url, { params, headers, observe: 'response' });
  }

  post<T>(url: string, body: any, params?: HttpParams | { [param: string]: string | string[] }, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, body, { params, headers });
  }

  put<T>(url: string, body: any, params?: HttpParams | { [param: string]: string | string[] }, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, body, { params, headers });
  }

  patch<T>(url: string, body: any, params?: HttpParams | { [param: string]: string | string[] }, headers?: HttpHeaders): Observable<T> {
    return this.http.patch<T>(url, body, { params, headers });
  }

  delete<T>(url: string, params?: HttpParams | { [param: string]: string | string[] }, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(url, { params, headers });
  }

  head<T>(url: string, params?: HttpParams | { [param: string]: string | string[] }, headers?: HttpHeaders): Observable<T> {
    return this.http.head<T>(url, { params, headers });
  }

  options<T>(url: string, params?: HttpParams | { [param: string]: string | string[] }, headers?: HttpHeaders): Observable<T> {
    return this.http.options<T>(url, { params, headers });
  }

  // Generic request when you need dynamic HTTP verbs or extra options
  request<T>(method: string, url: string, options?: { body?: any; params?: HttpParams | { [param: string]: string | string[] }; headers?: HttpHeaders; observe?: any }): Observable<T> {
    return this.http.request<T>(method, url, options);
  }
}
