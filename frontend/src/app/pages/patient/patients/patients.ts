import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { PatientService } from 'src/app/providers/patient.service';
import { NavigationService } from 'src/app/providers/navigation.service';

@Component({
  selector: 'app-new-lab-visit',
  templateUrl: './patients.html',
  styleUrls: ['./patients.scss']
})
export class PatientsOverviewComponent implements OnInit {
  patients = [];
  rememberedState: any;
  constructor(private patientService: PatientService, private router: Router, private navigation: NavigationService) { }

  displayedColumns: string[] = ['id', 'name', 'mobile_number', 'buttons'];
  dataSource = new MatTableDataSource<any>([]);
  search = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.patientService.getAllPatients().subscribe((arr: any) => {
      this.rememberedState = arr;

      this.dataSource = new MatTableDataSource(arr);
    });
  }
  doSearch() {
    if (this.search.length) {
      this.patientService.searchPatientByMobile(this.search).subscribe((paitentsArr: any) => {
        this.dataSource = new MatTableDataSource(paitentsArr);
      });
    } else {
      this.dataSource = this.rememberedState;
    }
  }

  createNewVisit(patient) {
    const params: NavigationExtras = {
      queryParams: {
          'id': patient.id
      }
    };
    this.navigation.goToCreateNewVisit(params);
  }

  goToCreateNewPatientPage() {
    this.navigation.goToCreateNewPatient();
  }
  createPatient() {
    this.navigation.goToCreateNewPatient();
  }
}



