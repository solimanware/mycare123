import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { VisitService } from 'src/app/providers/visit.service';
import { NavigationService } from 'src/app/providers/navigation.service';

@Component({
  selector: 'app-visit-detail',
  templateUrl: './view.html',
  styleUrls: ['./view.scss']
})
export class ViewVisitComponent implements OnInit {
  visitId: number;
  patient;
  categories;
  tests;
  item;
  items;
  createdItems = [];
  notes;
  testIds = [];
  addLabsEnabled = false;
  visit;
  constructor(
    private route: ActivatedRoute,
    private visitService: VisitService,
    private navigation: NavigationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.visitId = +params['id']; // (+) converts string 'id' to a number
      this.visitService.getVisit(this.visitId).subscribe((res: any) => {
        this.patient = res.patient;
        this.patient['age'] = this.getAge(res.patient.birth_date);
        this.createdItems = res.tests;
        this.visit = res;
        console.log(res);
      });
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

  toggleAddLabs() {
    this.addLabsEnabled = !this.addLabsEnabled;
  }
  eidtVisit() {
    const params: NavigationExtras = {
      queryParams: {
        'id': this.patient.id
      }
    };
    this.navigation.goToEditVistDetail(this.visit.id);
  }

}
