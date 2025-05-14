import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  api_url = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getEtudiants(): Observable<any> {
    return this.http.get(this.api_url + '/etudiants');
  }

  getEtudiant(id: any): Observable<any> {
    return this.http.get(this.api_url + '/etudiants/' + id);
  }

  updateEtudiant(id: any, data: any): Observable<any> {
    return this.http.put(this.api_url + '/etudiants/' + id, data);
  }

  deleteEtudiant(id: any): Observable<any> {
    return this.http.delete(this.api_url + '/etudiants/' + id);
  }
}
