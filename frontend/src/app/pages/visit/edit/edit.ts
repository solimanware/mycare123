import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/providers/patient.service';
import { TestsService } from 'src/app/providers/tests.service';
import { VisitService } from 'src/app/providers/visit.service';
import * as moment from 'moment';
import { NavigationService } from 'src/app/providers/navigation.service';

@Component({
  selector: 'app-create-new-lab-visit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})
export class EditVisitComponent implements OnInit {
  patient;
  categories;
  tests;
  items;
  createdItems = [];
  notes;
  testIds = [];
  visit;
  gottenItems = [];
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private testService: TestsService,
    private visitSerivce: VisitService,
    private navigation: NavigationService) { }

  ngOnInit() {
    // get visit id to edit
    this.route.params.subscribe(({ id }) => {
      this.visitSerivce.getVisit(id).subscribe((res: any) => {
        console.log(res);
        this.visit = res;
        this.patient = res.patient;
        this.patient['age'] = this.getAge(res.patient.birth_date);
        for (const item of res.tests) {
          this.createdItems.push(item.name);
        }
        for (const item of res.tests) {
          this.testIds.push(item.id);
        }
      });
    });
    this.getTestsCategories();
  }
  getAge(value) {
    const dob = moment(value);
    const now = moment();
    const diff = moment.duration(now.diff(dob));
    const ageYears = diff.years();
    const ageMonths = diff.months();
    return `${ageYears} years, ${ageMonths} months`;
  }
  editVisit() {
    this.visitSerivce.patchVisit(this.visit.id, this.patient['id'], this.testIds, this.notes).subscribe(res => {
      console.log(res);
      // navigate
      alert('visit edited');
      this.navigation.goToVisitsOverview();

    });
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
  chooseItem($event) {
    const testName = $event.value;
    console.log(testName);

    for (let i = 0; i < this.tests.length; i++) {
      if (testName === this.tests[i].name) {
        const id = this.tests[i].id;
        this.testService.getTestItems(id).subscribe((items: any) => {
          this.testIds.push(items.id);

          this.items = items.tests_items;
        });

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
