import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService{

  constructor(private http: HttpClient) {

  }

  getRoles(): Observable<any> {
    return this.http.get(`${environment.api_url}/roles`);
  }

  addRole(data: any): Observable<any> {  
    return this.http.post(`${environment.api_url}/role-add`, data);
  }

  deleteRole(id: number): Observable<any> { 
    return this.http.delete(`${environment.api_url}/role-delete/${id}`);
  }

}
