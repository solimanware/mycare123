import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { VisitService } from 'src/app/providers/visit.service';
import { PatientService } from 'src/app/providers/patient.service';
import { NavigationService } from 'src/app/providers/navigation.service';

@Component({
  selector: 'app-visits-overview',
  templateUrl: './visits.html',
  styleUrls: ['./visits.scss']
})
export class VisitsOverviewComponent implements OnInit {
  constructor(
    private visitSerivce: VisitService,
    private patientService: PatientService,
    private navigation: NavigationService) { }
  displayedColumns: string[] = ['id', 'name', 'mobileNumber', 'visitDate'];
  dataSource = new MatTableDataSource<any>([]);
  currentSelection;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  disabled = true;
  patientId: number;
  search: string;
  visits: any;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.visitSerivce.getVisits().subscribe((data: any) => {
      console.log(data);
      // data.created_at = moment(data.created_at).format('YYYY/MM/DD')
      console.log(data.created_at);
      this.visits = data;



      this.dataSource = new MatTableDataSource<any>(data);
    });
  }
  chooseVisit(row) {
    console.log(row);
    this.patientId = row.id;
    this.currentSelection = row.id;
    this.disabled = false;

  }
  doSearch() {
    if (this.search.length) {
      this.patientService.searchPatientByMobile(this.search).subscribe((paitentsArr: any) => {
        const patient = paitentsArr[0];
        const patientMobileNumber = patient.mobile_number;


        const filter = this.visits.filter(visit => visit.patient.mobile_number === patientMobileNumber);
        console.log(filter);


        this.dataSource = new MatTableDataSource(filter);
      });
    } else {
      this.dataSource = this.visits;
    }
  }

  viewVisit(id) {
    this.navigation.goToViewVistDetail(id);
  }
  enterResults(id) {
    this.navigation.goToCreateVisitResults(id);
  }
  editResult(id) {
    this.navigation.goToEditVisitResults(id);
  }
  viewResults(id) {
    this.navigation.goToViewVisitResults(id);
  }


}
