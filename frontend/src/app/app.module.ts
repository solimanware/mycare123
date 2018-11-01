import { CustomMaterialModule } from './custom-material/custom-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { NewPatientComponent } from './new-patient/new-patient.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewLabVisitComponent } from './new-lab-visit/new-lab-visit.component';
import { CreateNewLabVisitComponent } from './create-new-lab-visit/create-new-lab-visit.component';
import { EnterTestResultsComponent } from './enter-test-results/enter-test-results.component';
import { VisitsOverviewComponent } from './visits-overview/visits-overview.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create/visit', component: NewLabVisitComponent },
  { path: 'create/visit/new', component: CreateNewLabVisitComponent },
  { path: 'visits/enter-results', component: EnterTestResultsComponent },
  { path: 'create/patient', component: NewPatientComponent },
  { path: 'visits', component: VisitsOverviewComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    LoginComponent,
    DashboardComponent,
    NewPatientComponent,
    NewLabVisitComponent,
    CreateNewLabVisitComponent,
    EnterTestResultsComponent,
    VisitsOverviewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AppRoutingModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
