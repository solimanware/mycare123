import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/providers/patient.service';
import { TestsService } from 'src/app/providers/tests.service';
import { VisitService } from 'src/app/providers/visit.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import * as moment from 'moment'
import { NavigationService } from 'src/app/providers/navigation.service';

@Component({
  selector: 'app-view-results',
  templateUrl: './view.html',
  styleUrls: ['./view.scss']
})
export class ViewResultsComponent implements OnInit {
  patientId: number;
  visit: any;
  patient: any;
  tests:any;
  currentSelection: any;
  results = {};

  constructor(
    private patientService: PatientService,
    private visitService: VisitService,
    private testService: TestsService,
    private navigation: NavigationService,
    private route: ActivatedRoute) { }

  displayedColumns: string[] = ['id', 'name', 'test_result', 'normal_range'];
  dataSource = new MatTableDataSource<any>([]);
  
  
  displayedRequiredTestsColumns: string[] = ['name','id','status']
  testNamesSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = +params['id']; // (+) converts string 'id' to a number
      this.visitService.getVisit(this.patientId).subscribe((visit: any) => {
        console.log(visit);
        this.visit = visit
        this.patient = visit.patient
        this.patient["age"] = this.getAge(this.patient.birth_date)
        this.tests = visit.tests
        this.testNamesSource = new MatTableDataSource<any>(this.tests);
      })
    })
  }

  editTestItems(id){
    console.log(id);
    this.currentSelection = id;
    
    this.testService.getTestItems(id).subscribe((items:any)=>{
      console.log(items);
      console.log(items.tests_items);
      
      this.dataSource =  new MatTableDataSource<any>(items.tests_items);
    })
  }
  submitTestResults(){
    console.log(this.results);
    let arr = [];
    for(let result in this.results){
      arr.push({
        id:result,
        value:this.results[result]
      })
    }
    console.log(arr);
    console.log(this.visit.id);
    
    this.visitService.patchResult(this.visit.id,arr).subscribe(res=>{
      console.log(res);
    })
    
    
    
  }
  editResults(){
    this.navigation.goToEditVisitResults(this.visit.id)
  }

  getAge(value){
    let dob = moment(value)    
    let now = moment()

    let diff = moment.duration(now.diff(dob))

    let ageYears = diff.years()
    
    let ageMonths = diff.months();

    return `${ageYears} years, ${ageMonths} months`
  }


}
