import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SessionsService{

    constructor(
        private http: HttpService,
        private pipe: DecimalPipe
    ) {
        
    }

    getAllSessions (): Observable<any> {
        return this.http.get('sessions');
    }
}
