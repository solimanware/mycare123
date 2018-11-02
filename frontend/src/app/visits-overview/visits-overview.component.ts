import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from 'moment';

@Component({
  selector: "app-visits-overview",
  templateUrl: "./visits-overview.component.html",
  styleUrls: ["./visits-overview.component.scss"]
})
export class VisitsOverviewComponent implements OnInit {
  constructor() {}
  displayedColumns: string[] = ["id", "name", "mobileNumber","visitDate"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  mobileNumber: number;
  visitDate: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "أحمد محمد حسنين", mobileNumber: 1063116380, visitDate: moment().add(1,'day').format('DD/MM/YYYY') },
  { position: 2, name: "يوسف سعيد حسن", mobileNumber: 1004127134, visitDate: moment().add(2,'days').format('DD/MM/YYYY') },
  { position: 3, name: "نهى خليل محمد", mobileNumber: 1043816370, visitDate: moment().add(-3,'days').format('DD/MM/YYYY') },
  { position: 4, name: "أمل السيد سالم", mobileNumber: 1023776320, visitDate: moment().add(-5,'days').format('DD/MM/YYYY') },
  { position: 5, name: "عبدالعال محمد عبدالعال", mobileNumber: 1011162537, visitDate: moment().add(-10,'days').format('DD/MM/YYYY') }
];
