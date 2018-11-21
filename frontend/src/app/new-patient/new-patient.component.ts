import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import { PatientService } from '../patient.service';

const mobileRegEx = /^[0]\d{10}$/;

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {
  genders = [
    {value:'male',viewValue:'Male'},
    {value:'female',viewValue:'Female'},
    {value:'other',viewValue:'Other'},
  ]
  
  name = new FormControl('', []);
  gender = new FormControl('', []);
  profession = new FormControl('', []);
  email = new FormControl('', [ Validators.email]);
  birthDate = new FormControl('', []);
  mobileNumber = new FormControl('',[Validators.pattern(mobileRegEx)])
  confirmMobileNumber = new FormControl('',[Validators.pattern(mobileRegEx)])
  ageYears:number = 0;
  ageMonths:number = 0;
  constructor(private patientService:PatientService) { }

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let mobileNumber = group.controls.mobileNumber.value;
  let confirmMobileNumber = group.controls.confirmMobileNumber.value;

  return mobileNumber === confirmMobileNumber ? null : { notSame: true }     
}

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getWrongNumber(){
    return this.mobileNumber.hasError('required') ? 'You must enter a value':
    this.mobileNumber.hasError('mobileNumber')?'Not Valid Mobile Number':
    ''
  }
 
  changeAge(event){
    console.log(event.value);
    
    let dob = moment(event.value)    
    let now = moment()

    let diff = moment.duration(now.diff(dob))

    this.ageYears = diff.years()
    console.log(this.ageYears);
    
    this.ageMonths = diff.months();
  }


  submitNewPatient(){

    let data = {
      name:this.name.value,
      mobileNumber:this.mobileNumber.value,
      gender:this.gender.value,
      email:this.email.value,
      birthDate:moment(this.birthDate.value,'YYYY-MM-DD HH:mm:ss'),
      profession:this.profession.value
    }

    console.log(data.birthDate);
    
    
    this.patientService.postPatient(data).subscribe(res=>{
      console.log(res);
    })
  }
}


