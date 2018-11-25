import { CustomMaterialModule } from './custom-material/custom-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewLabVisitComponent } from './new-lab-visit/new-lab-visit.component';
import { CreateNewLabVisitComponent } from './create-new-lab-visit/create-new-lab-visit.component';
import { EnterTestResultsComponent } from './enter-test-results/enter-test-results.component';
import { VisitsOverviewComponent } from './visits-overview/visits-overview.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { MOMENT_DATE_FORMATS, MomentDateAdapter } from './adabters/date';
import { VisitDetailComponent } from './visit-detail/visit-detail.component';


const routes: Routes = AppRoutes

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
    VisitsOverviewComponent,
    VisitDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AppRoutingModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClientModule,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
