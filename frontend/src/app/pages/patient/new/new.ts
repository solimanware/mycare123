import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { PatientService } from 'src/app/providers/patient.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { NavigationExtras } from '@angular/router';

const mobileRegEx = /^\+?\d+$/;

@Component({
  selector: 'app-new-patient',
  templateUrl: './new.html',
  styleUrls: ['./new.scss']
})
export class NewPatientComponent implements OnInit {
  name = new FormControl('', Validators.required);
  mobileNumber = new FormControl('', Validators.required);
  confirmMobileNumber = new FormControl('', Validators.required);
  gender = new FormControl('', Validators.required);
  birthDate = new FormControl('', Validators.required);
  email = new FormControl('', Validators.email);
  profession = new FormControl('');

  genders = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' }
  ];
  ageYears = 0;
  ageMonths = 0;
  error: string;
  alreadExists: boolean;
  constructor(private patientService: PatientService, private navigation: NavigationService) { }

  ngOnInit() {
    this.mobileNumber.valueChanges.subscribe(res=>{
      if(res.length>=10){
        this.patientService.searchPatientByMobile(res).subscribe((found:any)=>{
          if(found.length>0){
            this.alreadExists = true;
          }else{
            this.alreadExists = false;
          }
        })
      }
    })
  }




  changeAge(_) {
    // event has been fired changes happened to picker
    const dob = _.value;
    this.birthDate.setValue(dob)
    
    const now = moment();
    const diff = moment.duration(now.diff(dob));
    console.log(diff);
    
    this.ageYears = diff.years();
    this.ageMonths = diff.months();
    console.log(this.ageYears);
    console.log(this.ageMonths);
    
    
  }

  validateData() {
    return this.name &&
      this.gender.value &&
      this.mobileNumber.value &&
      this.mobileNumber.value === this.confirmMobileNumber.value &&
      this.birthDate.value && !this.alreadExists;
  }

  submitPatient() {
    console.log('hiii');
    // validations required
    if (this.validateData()) {
      // map data to server
      const data: any = {
        name: this.name.value,
        mobile_number: this.mobileNumber.value,
        gender: this.gender.value,
        email: this.email.value,
        birth_date: moment(this.birthDate.value).format('YYYY-MM-DD HH:mm:ss'),
        profession: this.profession.value
      };
      // 'YYYY-MM-DD HH:mm:ss'
      // post to server
      console.log('posting', data);

      this.postPatientToServer(data);
      // custom error checks
    } else if (!this.birthDate.valid) {
      this.error = 'enter birth date';
    } else if (this.mobileNumber.value !== this.confirmMobileNumber.value) {
      this.error = `The Mobile Numbers Don't match`;
    } else if(this.alreadExists){
      this.error = 'This patient already exists';
    } else {
      this.error = `Fill in required data`;
    }
  }

  postPatientToServer(data) {
    this.patientService.postPatient(data).subscribe((res: any) => {
      console.log(res);
      const params: NavigationExtras = {
        queryParams: {
          'id': res.id
        }
      };
      this.navigation.goToCreateNewVisit(params);
    });
  }

}




