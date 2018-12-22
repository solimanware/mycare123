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
    });
  }
  patchVisit(id, patientId, testIds, notes) {
    return this.http.patch(`https://mycare123.herokuapp.com/api/visits/${id}`, {
      patient_id: patientId,
      tests_ids: testIds,
      notes: notes
    });
  }
  getVisits() {
    return this.http.get('https://mycare123.herokuapp.com/api/visits');
  }
  getVisit(id) {
    return this.http.get(`https://mycare123.herokuapp.com/api/visits/${id}`);
  }
  patchResult(id, body) {
    return this.http.patch(`https://mycare123.herokuapp.com/api/visits/${id}/results`, body);
  }
  getVisitResults(id) {
    return this.http.get(`https://mycare123.herokuapp.com/api/visits/${id}/results`);
  }
  getVisitPrintPDF(id) {
    return this.http.get(`https://mycare123.herokuapp.com/api/visits/${id}/results-report`);
  }
  printVisitPDF(id) {
    window.location.href = `https://mycare123.herokuapp.com/api/visits/${id}/results-report`;
  }
  getVisitPrint(id) {
    return this.http.get(`https://mycare123.herokuapp.com/api/visits/${id}/results-report`);
  }
}
