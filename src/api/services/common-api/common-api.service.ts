import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonApiService {

    constructor(private http: HttpClient) { }

    protected get<T>(url: string): Observable<T> {
        const token = localStorage.getItem("token");
        return this.http
            .get<T>(url, {
                headers: token ? {
                    "Authorization": "Bearer " + token
                } : {}
            });
    }

    protected delete<T>(url: string): Observable<T> {
        const token = localStorage.getItem("token");
        return this.http
            .delete<T>(url, {
                headers: token ? {
                    "Authorization": "Bearer " + token
                } : {}
            });
    }

    protected post<T>(url: string, body: any): Observable<T> {
        const token = localStorage.getItem("token");
        return this.http.post<T>(
            url,
            body,
            {
                headers: token ? {
                    "Authorization": "Bearer " + token
                } : {}
            });
    }

    protected put<T>(url: string, body: any): Observable<T> {
        const token = localStorage.getItem("token");
        return this.http.put<T>(
            url,
            body,
            {
                headers: token ? {
                    "Authorization": "Bearer " + token
                } : {}
            });
    }

}
