import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  menuItems: {title: string, link: string, icon: string}[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver) {
    this.menuItems = [
      {title: 'New Lab Visit', link: '/patients' , icon: 'edit'},
      {title: 'Visits Overview', link: '/visits' , icon: 'book'},
    ];
  }

  ngOnInit() {
  }

}
