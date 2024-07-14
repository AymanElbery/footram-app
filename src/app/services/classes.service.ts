import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService{

    constructor(
        private http: HttpService,
        private pipe: DecimalPipe
    ) {
        
    }

    getClasses(): Observable<any> {
        return this.http.get('classes');
    }

    getClassDetails(id: number): Observable<any> {
        return this.http.get(`class-details/${id}`);
    }

    deleteClass(id: number): Observable<any> {
        return this.http.delete(`class-delete/${id}`);
    }

    addClass(data: any): Observable<any> {
        return this.http.post('class-add', data);
    }

    changeClassStatus(id: number): Observable<any> {    
        return this.http.post(`class-change-status/${id}`, {});
    }

    getClassSessions(class_id: number): Observable<any> {
        return this.http.get(`class-sessions/${class_id}`);
    }

    generateClassSessions(data: any): Observable<any> {        
        return this.http.post('class-generate-sessions', data);
    }

    changeClassSessionStatus(id: number): Observable<any> { 
        return this.http.post(`class-session-change-status/${id}`, {});
    }

    getClassCoaches(id: number): Observable<any> {
        return this.http.get(`class-coaches/${id}`);
    }
}
