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
  constructor(private route: ActivatedRoute,private patientService:PatientService,private testService:TestsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(({id}) => {
      this.patientService.getPatientById(id).subscribe(patient=>{
        this.patient = patient;
      })
      //this.patient = data;
     // console.log(this.patient);
    })
    this.getTestsCategories();
  }

  getTestsCategories(){
    this.testService.getAllTestsCategories().subscribe(categories=>{
      this.categories = categories;
    })
  }

}
