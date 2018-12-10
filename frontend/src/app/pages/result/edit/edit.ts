import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/providers/patient.service';
import { VisitService } from 'src/app/providers/visit.service';
import * as moment from 'moment';
import { TestsService } from 'src/app/providers/tests.service';
import { NavigationService } from 'src/app/providers/navigation.service';

@Component({
  selector: 'app-enter-test-results',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})
export class EditResultsComponent implements OnInit {


  patientId: number;
  visit: any;
  patient: any;
  tests: any;
  currentSelection: any;
  results = {};
  resultsArr = [];

  constructor(
    private patientService: PatientService,
    private visitService: VisitService,
    private testService: TestsService,
    private router: Router,
    private route: ActivatedRoute,
    private navigation: NavigationService) { }

  displayedColumns: string[] = ['id', 'item_name', 'value', 'item_normal_range'];
  dataSource = new MatTableDataSource<any>([]);


  displayedRequiredTestsColumns: string[] = ['name', 'id'];
  testNamesSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.patientId = +params['id']; // (+) converts string 'id' to a number
        this.visitService
          .getVisit(this.patientId)
          .subscribe((visit: any) => {
            console.log(visit);
            this.visit = visit;
            this.patient = visit.patient;
            this.patient['age'] = this.getAge(this.patient.birth_date);
            this.tests = visit.tests;
            this.testNamesSource = new MatTableDataSource<any>(this.tests);
            this.visitService.getVisitResults(this.visit.id).subscribe((res: any) => {
              console.log(res);
              this.resultsArr = res;
            });
          });
      });

  }

  editTestItems(id) {
    console.log(id);
    this.currentSelection = id;
    const testItems = this.resultsArr.filter(item => item.test_id === id);
    this.dataSource = new MatTableDataSource<any>(testItems);

  }

  submitTestResults() {
    const arr = [];
    // tslint:disable-next-line:forin
    for (const result in this.results) {
      arr.push({
        id: result,
        value: this.results[result]
      });
    }

    this.visitService.patchResult(this.visit.id, arr).subscribe(res => {
      console.log(res);
    });

  }

  getAge(value) {
    const dob = moment(value);
    const now = moment();

    const diff = moment.duration(now.diff(dob));

    const ageYears = diff.years();

    const ageMonths = diff.months();

    return `${ageYears} years, ${ageMonths} months`;
  }


  discard(){
    this.navigation.goToViewVisitResults(this.visit.id);
  }
}


