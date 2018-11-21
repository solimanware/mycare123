import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(public http: HttpClient) { }

  postVisit(patientId, testIds, notes) {
    return this.http.post('https://mycare123.herokuapp.com/api/visits', {
      patient_id: patientId,
      tests_ids: testIds,
      notes: notes
    })
  }
  getVisits(){
    return this.http.get('https://mycare123.herokuapp.com/api/visits')
  }
  getVisit(id){
    return this.http.get(`https://mycare123.herokuapp.com/api/visits/${id}`)
  }
}
