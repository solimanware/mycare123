import { Routes } from "@angular/router";
import { VisitsOverviewComponent } from "../pages/visit/visits/visits";
import { VisitDetailComponent } from "../pages/visit/visit-detail/visit-detail.component";
import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { CreateNewLabVisitComponent } from "../pages/visit/edit/edit";
import { EnterTestResultsComponent } from "../pages/visit/results/results";
import { LoginComponent } from "../pages/auth/login/login.component";
import { NewPatientComponent } from "../pages/patient/new/new";
import { NewLabVisitComponent } from "../pages/visit/add/add";


export const AppRoutes: Routes = [
    { path: '', redirectTo: '/visits', pathMatch: 'full' },
    { path: 'visits', component: VisitsOverviewComponent },
    { path: 'visits/new', component: CreateNewLabVisitComponent },
    { path: 'visits/:id', component: VisitDetailComponent },
    { path: 'visits/:id/edit', component: CreateNewLabVisitComponent },
    { path: 'visits/:id/results', component: EnterTestResultsComponent },
    { path: 'patients', component: NewLabVisitComponent },
    { path: 'patients/new', component: NewPatientComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
  ];