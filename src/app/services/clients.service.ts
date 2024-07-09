import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService{

    constructor(private http: HttpService) {

    }

    getClients(): Observable<any> {
        return this.http.get('clients');
    }

    addClient(data: any): Observable<any> { 
      console.log(data);
      return this.http.post('client-add', data);
    }

    deleteClient(id: any): Observable<any> {
        return this.http.delete('client-delete/' + id);
    }

}
