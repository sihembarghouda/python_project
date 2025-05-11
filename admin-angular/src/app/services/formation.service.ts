import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormationService {
  api_url = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getFormations(): Observable<any> {
    return this.http.get(this.api_url + '/formations');
  }

  getFormation(id: any): Observable<any> {
    return this.http.get(this.api_url + '/formations/' + id);
  }

  updateFormation(id: any, data: any): Observable<any> {
    return this.http.put(this.api_url + '/formations/' + id, data);
  }

  deleteFormation(id: any): Observable<any> {
    return this.http.delete(this.api_url + '/formations/' + id);
  }

  ajouterFormation(data: any): Observable<any> {
    return this.http.post(this.api_url + '/formations', data);
  }
}
