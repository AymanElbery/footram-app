import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, debounceTime, delay, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserTable } from '../interfaces/user.interface';
import { SortColumn, SortDirection } from '../directives/sortable.directive';
import { DecimalPipe } from '@angular/common';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService{

    constructor(
        private http: HttpService,
        private pipe: DecimalPipe
    ) {
        
    }

    getUsers(): Observable<any> {
        return this.http.get('users');
    }

    deleteUser(id: any): Observable<any> {
        return this.http.delete('user-delete/' + id);
    }

    addUser(data: any): Observable<any> {
        return this.http.post('user-add', data);
    }

    changeUserCurrentRole(role_id: string): Observable<any> {
        return this.http.post('user-change-current-role', {role_id: role_id});
    }   
}
