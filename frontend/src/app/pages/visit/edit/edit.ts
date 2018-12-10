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
  allTests = [];
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
          this.createdItems.push(item);
        }
        for (const item of res.tests) {
          this.testIds.push(item.id);
        }
      });
    });
    this.displayAllTests();
  }

  displayAllTests() {
    this.testService.getAllTests().subscribe((tests: any) => {
      this.allTests = tests;
    });
  }
  chooseTest(event) {
    this.createdItems.push(event);
    this.createdItems = removeDuplicates(this.createdItems, 'id')

    function removeDuplicates(myArr, prop) {
      return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    }
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
    const testIds = [];
    this.createdItems.forEach(item => {
      testIds.push(item.id);
    });
    this.visitSerivce.patchVisit(this.visit.id, this.patient['id'], testIds, this.notes).subscribe(res => {
      alert('visit edited');
      this.navigation.goToVisitsOverview();

    });
  }
  goVisitsOverview() {
    this.navigation.goToVisitsOverview();
  }

  discard() {
    this.navigation.goToViewVistDetail(this.visit.id);
  }

}
