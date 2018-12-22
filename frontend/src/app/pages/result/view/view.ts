import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/providers/patient.service';
import { TestsService } from 'src/app/providers/tests.service';
import { VisitService } from 'src/app/providers/visit.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import * as moment from 'moment';
import { NavigationService } from 'src/app/providers/navigation.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-results',
  templateUrl: './view.html',
  styleUrls: ['./view.scss']
})
export class ViewResultsComponent implements OnInit {
  patientId: number;
  visit: any;
  patient: any;
  tests: any;
  currentSelection: any;
  results = {};
  resultsArr = [];
  print: any;

  constructor(
    private patientService: PatientService,
    private visitService: VisitService,
    private testService: TestsService,
    private navigation: NavigationService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  displayedColumns: string[] = ['id', 'item_name', 'value', 'item_normal_range'];
  dataSource = new MatTableDataSource<any>([]);


  displayedRequiredTestsColumns: string[] = ['name', 'id'];
  testNamesSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = +params['id']; // (+) converts string 'id' to a number
      this.visitService.getVisit(this.patientId).subscribe((visit: any) => {
        console.log(visit);
        this.visit = visit;
        this.getVisitPrint(visit.id);
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
  printVisit() {
    console.log('printing');

    this.visitService.printVisitPDF(this.visit.id);
  }

  getVisitPrint(id) {
    this.visitService.getVisitPrint(id).subscribe(result => {
      this.print = this.sanitizer.bypassSecurityTrustHtml(this.view(result));
      console.log(this.print);
      
    });
  }

  editResults() {
    this.navigation.goToEditVisitResults(this.visit.id);
  }

  getAge(value) {
    const dob = moment(value);
    const now = moment();

    const diff = moment.duration(now.diff(dob));

    const ageYears = diff.years();

    const ageMonths = diff.months();

    return `${ageYears} years, ${ageMonths} months`;
  }


  view(data) {
    const firstObj = data[Object.keys(data)[0]][0];

    console.log({ x: firstObj })
    const date = new Date(firstObj.visit_created_at);

    const patientName = firstObj.patient_name;
    const patientGender = firstObj.patient_gender.replace(/\b\w/g, l => l.toUpperCase());


    const visitDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const visitTime = date.getHours() + ':' + date.getMinutes();


    const labName = data.labName || "معمل الحياة";
    return `
        <h1 style="text-align:center">${labName}<//h1>
        <table border="1">
            <tr>
                <td>Visit date</td>
                <td>${visitDate}</td>
                <td>Visit time</td>
                <td>${visitTime}</td>
            </tr>
            <tr>
                <td>Patient name:</td>
                <td>${patientName}</td>
                <td>Gender</td>
                <td>${patientGender}</td>
            </tr>
        </table>
        <hr>
        <table border="1">
            <tr><td>Test name</td><td>Test items</td></tr>
            ${getTests(data)}
        </table>
    `;
    function getTests(data) {
      let res = '';
      Object.keys(data).forEach(key => {
        res += `<tr>`;

        res += `<td>` + data[key][0].test_name + `</td>`

        res += `<td>${getItems(data[key])}</td>`;

        res += `</tr>`;
      })
      return res;
    }
    /**
   * 
   * @param {Array} data items 
   */
    function getItems(data) {
      let res = `<table border='1'>
      <tr>
          <td>Item name</td>
          <td>result</td>
          <td>Normal range </td>
      </tr>
  `;

      data.forEach(item => {
        res += '<tr>';
        res += '<td>' + item.item_name + '</td>'
        res += '<td>' + (item.value || 'pending ..') + '</td>'
        res += '<td>' + item.item_normal_range + '</td>'
        res += '</tr>';
      })

      res += '</table>';

      return res;
    }
  }

}
