import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  goToCreateNewVisit(params?): void {
    this.router.navigate(['visits', 'create'], params);
  }
  goToCreateNewPatient(params?): void {
    this.router.navigate(['patients', 'create'], params);
  }
  goToVisitsOverview(params?): void {
    this.router.navigate(['visits'], params);
  }
  goToViewVistDetail(id): void {
    this.router.navigate(['visits/', id]);
  }
  goToEditVistDetail(id): void {
    this.router.navigate(['visits/', id, 'edit']);
  }
  goToCreateVisitResults(id): void {
    this.router.navigate(['visits/', id, 'results', 'create']);
  }
  goToViewVisitResults(id): void {
    this.router.navigate(['visits/', id, 'results', 'view']);
  }
  goToEditVisitResults(id): void {
    this.router.navigate(['visits/', id, 'results', 'edit']);
  }
}
