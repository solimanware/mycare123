import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment'
import { VisitService } from 'src/app/providers/visit.service';

@Component({
  selector: 'app-visit-detail',
  templateUrl: './view.html',
  styleUrls: ['./view.scss']
})
export class ViewVisitComponent implements OnInit {
  patientId:number;
  patient;
  categories;
  tests;
  item;
  items;
  createdItems = [];
  notes;
  testIds = [];
  addLabsEnabled:boolean = false;
  constructor(private route: ActivatedRoute,private visit:VisitService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = +params['id']; // (+) converts string 'id' to a number
      this.visit.getVisit(this.patientId).subscribe((res:any)=>{
        this.patient = res.patient;
        this.patient["age"] = this.getAge(res.patient.birth_date)
        console.log(res);
        this.createdItems = res.tests
        console.log(res.tests);
        
        console.log(this.patient);
        
        
      })
   });
  }

  getAge(value){
    let dob = moment(value)    
    let now = moment()

    let diff = moment.duration(now.diff(dob))

    let ageYears = diff.years()
    
    let ageMonths = diff.months();

    return `${ageYears} years, ${ageMonths} months`
  }

  toggleAddLabs(){
    this.addLabsEnabled = !this.addLabsEnabled
  }

}
