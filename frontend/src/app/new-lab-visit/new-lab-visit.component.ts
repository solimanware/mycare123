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
  id: number;
  name: string;
  mobileNumber: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'أحمد محمد حسنين', mobileNumber: "01063116380"},
  {id: 2, name: 'يوسف سعيد حسن', mobileNumber: "01004127134"},
  {id: 3, name: 'نهى خليل محمد', mobileNumber: "01043816370"},
  {id: 4, name: 'أمل السيد سالم', mobileNumber: "01023776320"},
  {id: 5, name: 'عبدالعال محمد عبدالعال', mobileNumber: "01011162537"}
];


