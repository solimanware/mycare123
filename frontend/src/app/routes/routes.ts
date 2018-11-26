import { Routes } from "@angular/router";
import { VisitsOverviewComponent } from "../pages/visit/visits/visits";
import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { LoginComponent } from "../pages/auth/login/login.component";
import { NewPatientComponent } from "../pages/patient/new/new";
import { EditVisitComponent } from "../pages/visit/edit/edit";
import { CreateVisitComponent } from "../pages/visit/create/create";
import { ViewVisitComponent } from "../pages/visit/view/view";
import { ViewResultsComponent } from "../pages/result/view/view";
import { EditResultsComponent } from "../pages/result/edit/edit";


export const AppRoutes: Routes = [
    { path: '', redirectTo: '/visits', pathMatch: 'full' },
    { path: 'visits', component: VisitsOverviewComponent },
    { path: 'visits/create', component: CreateVisitComponent },
    { path: 'visits/:id', component: ViewVisitComponent },
    { path: 'visits/:id/edit', component: EditVisitComponent },
    { path: 'visits/:id/results/edit', component: EditResultsComponent },
    { path: 'visits/:id/results/view', component: ViewResultsComponent },
    { path: 'patients', component: VisitsOverviewComponent },
    { path: 'patients/create', component: NewPatientComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
  ];