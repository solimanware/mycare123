import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient.service';
import { TestsService } from '../tests.service';

@Component({
  selector: 'app-create-new-lab-visit',
  templateUrl: './create-new-lab-visit.component.html',
  styleUrls: ['./create-new-lab-visit.component.scss']
})
export class CreateNewLabVisitComponent implements OnInit {
  patient;
  categories;
  tests;
  items;
  createdItems = [];
  constructor(private route: ActivatedRoute, private patientService: PatientService, private testService: TestsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(({ id }) => {
      this.patientService.getPatientById(id).subscribe(patient => {
        this.patient = patient;
      })
      //this.patient = data;
      // console.log(this.patient);
    })
    this.getTestsCategories();
  }

  chooseTestName($event) {
    let catName = $event.value
    for (let i = 0; i < this.categories.length; i++) {
      if (catName === this.categories[i].name) {
        this.tests = this.categories[i]["tests"]
        console.log(this.tests);

      }
    }

  }
  chooseItem($event) {
    let testName = $event.value
    console.log(testName);
    
    for (let i = 0; i < this.tests.length; i++) {
      if (testName === this.tests[i].name) {
        let id = this.tests[i].id
        this.testService.getTestItems(id).subscribe((items:any) => { 
        console.log(items);
        
          this.items = items.tests_items
        })

      }
    }

  }

  getTestsCategories() {
    this.testService.getAllTestsCategories().subscribe(categories => {
      console.log(categories)
      this.categories = categories;

    })
  }

  getTestItems(id) {
    this.testService.getTestItems(id).subscribe(items => {

      this.items = items;
    })
  }

  createNewTestItem($event){
    console.log($event.value);
    
    this.createdItems.push($event.value)
  }

}
