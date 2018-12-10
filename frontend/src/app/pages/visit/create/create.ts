import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/providers/patient.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { TestsService } from 'src/app/providers/tests.service';
import { VisitService } from 'src/app/providers/visit.service';
import * as moment from 'moment';

@Component({
  selector: 'app-new-lab-visit',
  templateUrl: './create.html',
  styleUrls: ['./create.scss']
})
export class CreateVisitComponent implements OnInit {
  patient;
  categories;
  tests;
  items;
  createdItems = [];
  notes;
  allTests = [];
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private testService: TestsService,
    private visitSerivce: VisitService,
    private navigation: NavigationService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(({ id }) => {
      this.patientService.getPatientById(id).subscribe((patient: any) => {
        this.patient = patient;
        this.patient['age'] = this.getAge(patient.birth_date);
      });
      // this.patient = data;
      // console.log(this.patient);
    });
    this.getTestsCategories();
    this.displayAllTests();
  }
  getAge(value) {
    const dob = moment(value);
    const now = moment();

    const diff = moment.duration(now.diff(dob));

    const ageYears = diff.years();

    const ageMonths = diff.months();

    return `${ageYears} years, ${ageMonths} months`;
  }

  createNewVisit() {
    const testIds = [];
    this.createdItems.forEach(item => {
      testIds.push(item.id);
    });
    console.log(testIds);
    if(testIds.length === 0){
      alert('"You must choose a test" and this visit is not saved unless user add tests')
    }
    this.visitSerivce.postVisit(this.patient['id'], testIds, this.notes).subscribe(res => {
      // navigate
      alert('visit created');
      this.navigation.goToVisitsOverview();

    });
  }

  displayAllTests() {
    this.testService.getAllTests().subscribe((tests: any) => {
      this.allTests = tests;
      console.log(tests);
    });
  }

  chooseTest(event) {
    console.log(event);
    this.createdItems.push(event);
  }

  chooseTestName($event) {
    const catName = $event.value;
    for (let i = 0; i < this.categories.length; i++) {
      if (catName === this.categories[i].name) {
        this.tests = this.categories[i]['tests'];
        console.log(this.tests);

      }
    }

  }

  getTestsCategories() {
    this.testService.getAllTestsCategories().subscribe(categories => {
      console.log(categories);
      this.categories = categories;

    });
  }

  getTestItems(id) {
    this.testService.getTestItems(id).subscribe(items => {

      this.items = items;
    });
  }

  createNewTestItem($event) {
    console.log($event.value);

    this.createdItems.push($event.value);
  }
  goVisitsOverview() {
    this.navigation.goToVisitsOverview();
  }

}



