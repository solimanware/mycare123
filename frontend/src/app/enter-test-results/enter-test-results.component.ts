import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enter-test-results',
  templateUrl: './enter-test-results.component.html',
  styleUrls: ['./enter-test-results.component.scss']
})
export class EnterTestResultsComponent implements OnInit {
  patient: any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  displayedColumns: string[] = ['id', 'testItem', 'testResult', 'testRange'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  id: number;
  testItem: string;
  testResult: string;
  testRange: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, testItem: 'ALT', testResult: '', testRange: '15-45 mg/dl' }
];

