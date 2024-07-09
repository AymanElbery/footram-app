import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CoachesService{

    constructor(
        private http: HttpService,
        private pipe: DecimalPipe
    ) {
        
    }

    getCoaches(): Observable<any> {
        return this.http.get('coaches');
    }

    getNationalities(): Observable<any> {
        return this.http.get('nationalities');
    }

    deleteCoache(id: any): Observable<any> {
        return this.http.delete('coache-delete/' + id);
    }

    addCoache(data: any): Observable<any> {
        return this.http.post('coache-add', data);
    }

    importCoaches(data: any): Observable<any> {
        return this.http.post('coaches-import', data);
    }

    changeCoacheStatus(id: any): Observable<any> {
        return this.http.post('coache-change-status/' + id, {});
    }

}
