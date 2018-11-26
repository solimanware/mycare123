import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/providers/patient.service';
import { TestsService } from 'src/app/providers/tests.service';
import { VisitService } from 'src/app/providers/visit.service';

@Component({
  selector: 'app-create-new-lab-visit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})
export class CreateNewLabVisitComponent implements OnInit {
  patient;
  categories;
  tests;
  items;
  createdItems = [];
  notes;
  testIds = [];
  constructor(private route: ActivatedRoute, private patientService: PatientService, private testService: TestsService,private visitSerivce:VisitService) { }

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


  createNewVisit(){
    console.log(this.patient["id"],this.testIds,this.notes);
    
    this.visitSerivce.postVisit(this.patient["id"],this.testIds,this.notes).subscribe(res=>{
      console.log(res);
      
    })
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
        this.testIds.push(items.id)
        
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
