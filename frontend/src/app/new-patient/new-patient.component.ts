import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import * as moment from 'moment';

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
  email = new FormControl('', [ Validators.email]);
  birthDate = new FormControl('', []);
  mobileNumber = new FormControl('',[Validators.pattern(mobileRegEx)])
  confirmMobileNumber = new FormControl('',[Validators.pattern(mobileRegEx)])
  ageYears:number = 0;
  ageMonths:number = 0;
  constructor() { }

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
 
  changeAge(){
    let dob = this.birthDate.value
    let now = moment()

    let diff = moment.duration(now.diff(dob))

    this.ageYears = diff.years()
    this.ageMonths = diff.months();
  }
}

//string
//pros:
//value more accurate > user is tech oriented // regex verfications
//cons: 
// alot of wrong entries in db //difficaulties in handling multible number formats


//number
//pros: symitric
//
//code of country more similar
//cons: integer is limited in some programming languages
//

