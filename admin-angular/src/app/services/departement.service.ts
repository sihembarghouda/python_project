import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartementService {
  api_url = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getDepartements(): Observable<any> {
    return this.http.get(this.api_url + '/departements');
  }

  getDepartement(id: any): Observable<any> {
    return this.http.get(this.api_url + '/departements/' + id);
  }

  updateDepartement(id: any, data: any): Observable<any> {
    return this.http.put(this.api_url + '/departements/' + id, data);
  }

  deleteDepartement(id: any): Observable<any> {
    return this.http.delete(this.api_url + '/departements/' + id);
  }

  ajouterDepartement(data: any): Observable<any> {
    return this.http.post(this.api_url + '/departements', data);
  }
}
