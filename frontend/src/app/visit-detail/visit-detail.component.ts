import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisitService } from '../visit.service';

@Component({
  selector: 'app-visit-detail',
  templateUrl: './visit-detail.component.html',
  styleUrls: ['./visit-detail.component.scss']
})
export class VisitDetailComponent implements OnInit {
  patientId:number;
  patient;
  categories;
  tests;
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
        this.patient = res.Patient;
        console.log(res);
        this.createdItems = res.tests
        console.log(res.tests);
        
        console.log(this.patient);
        
        
      })
   });
  }

  toggleAddLabs(){
    this.addLabsEnabled = !this.addLabsEnabled
  }

}
