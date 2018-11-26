import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient) 
    { }

    postPatient({name,mobileNumber,gender,birthDate,email,profession}) {
      return this.http.post('https://mycare123.herokuapp.com/api/patients',{
        name,
        mobile_number:mobileNumber,
        gender,
        birth_date:birthDate,
        email,
        profession
      })
    }

    getAllPatients(){
      return this.http.get('https://mycare123.herokuapp.com/api/patients')
    }

    searchPatientByMobile(mobile){
      return this.http.get(`https://mycare123.herokuapp.com/api/patients/search/?mobile=${mobile}`)
    }

    getPatientById(id){
      return this.http.get(`https://mycare123.herokuapp.com/api/patients/${id}`)
    }
    
}
