import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-new-lab-visit',
  templateUrl: './new-lab-visit.component.html',
  styleUrls: ['./new-lab-visit.component.scss']
})
export class NewLabVisitComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['id', 'name', 'mobileNumber'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  mobileNumber: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'أحمد محمد حسنين', mobileNumber: 1063116380},
  {position: 2, name: 'يوسف سعيد حسن', mobileNumber: 1004127134},
  {position: 3, name: 'نهى خليل محمد', mobileNumber: 1043816370},
  {position: 4, name: 'أمل السيد سالم', mobileNumber: 1023776320},
  {position: 5, name: 'عبدالعال محمد عبدالعال', mobileNumber: 1011162537}
];


