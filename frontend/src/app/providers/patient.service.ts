import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient) { }

  postPatient(data) {
    return this.http.post('https://mycare123.herokuapp.com/api/patients', data);
  }

  getAllPatients() {
    return this.http.get('https://mycare123.herokuapp.com/api/patients');
  }

  searchPatientByMobile(mobile) {
    return this.http.get(`https://mycare123.herokuapp.com/api/patients/search/?mobile=${mobile}`);
  }

  getPatientById(id) {
    return this.http.get(`https://mycare123.herokuapp.com/api/patients/${id}`);
  }

}
