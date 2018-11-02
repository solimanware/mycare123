import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  menuItems: {title: string, link: string, icon: string}[];

  constructor() {
    this.menuItems = [
      {title: 'Dashboard', link: '/dashboard' , icon: 'dashboard'},
      {title: 'New Lab Visit', link: '/create/visit' , icon: 'create'},
      {title: 'New Patient', link: '/create/patient' , icon: 'add'},
      {title: 'Visits Overview', link: '/visits' , icon: 'book'},
    ];
  }

  ngOnInit() {
  }

}
