import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NewLabVisitComponent } from "./new-lab-visit/new-lab-visit.component";
import { CreateNewLabVisitComponent } from "./create-new-lab-visit/create-new-lab-visit.component";
import { EnterTestResultsComponent } from "./enter-test-results/enter-test-results.component";
import { NewPatientComponent } from "./new-patient/new-patient.component";
import { VisitsOverviewComponent } from "./visits-overview/visits-overview.component";
import { LoginComponent } from "./login/login.component";
import { VisitDetailComponent } from "./visit-detail/visit-detail.component";

export const AppRoutes: Routes = [
    { path: '', redirectTo: '/visits', pathMatch: 'full' },
    { path: 'visits', component: VisitsOverviewComponent },
    { path: 'visits/:id', component: VisitDetailComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'create/visit', component: NewLabVisitComponent },
    { path: 'create/visit/new', component: CreateNewLabVisitComponent },
    { path: 'visits/:id/enter-results', component: EnterTestResultsComponent },
    { path: 'create/patient', component: NewPatientComponent },
    { path: 'login', component: LoginComponent }
  ];