import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PatientService } from '../patient.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-new-lab-visit',
  templateUrl: './new-lab-visit.component.html',
  styleUrls: ['./new-lab-visit.component.scss']
})
export class NewLabVisitComponent implements OnInit {
  patients = [];
  rememberedState: any;
  constructor(private patientService: PatientService,private router: Router) { }

  displayedColumns: string[] = ['id', 'name', 'mobile_number','buttons'];
  dataSource = new MatTableDataSource<any>([]);
  search = ''
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.patientService.getAllPatients().subscribe((arr: any) => {
      this.rememberedState = arr

      this.dataSource = new MatTableDataSource(arr)
    })
  }
  doSearch() {
    if (this.search.length) {
      this.patientService.searchPatientByMobile(this.search).subscribe((paitentsArr: any) => {
        this.dataSource = new MatTableDataSource(paitentsArr)
      })
    } else {
      this.dataSource = this.rememberedState;
    }
  }
  createNewVisit(patient){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "id": patient.id
      }
    };
    this.router.navigate(['/create/visit/new'],navigationExtras)
  }
}



