import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './routes/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutes } from './routes/routes';
import { SideNavComponent } from './bootstrap/side-nav/side-nav.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomMaterialModule } from './helpers/custom-material/custom-material.module';
import { VisitsOverviewComponent } from './pages/visit/visits/visits';
import { NewPatientComponent } from './pages/patient/new/new';
import { ViewVisitComponent } from './pages/visit/view/view';
import { ViewResultsComponent } from './pages/result/view/view';
import { CreateVisitComponent } from './pages/visit/create/create';
import { EditVisitComponent } from './pages/visit/edit/edit';
import { CreateResultsComponent } from './pages/result/create/create';
import { EditResultsComponent } from './pages/result/edit/edit';
import { PatientsOverviewComponent } from './pages/patient/patients/patients';
import { MomentDateAdapter, MOMENT_DATE_FORMATS } from './helpers/adabters/date';
import { MAT_DATE_LOCALE, DateAdapter, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material';
import { SearchBarComponent } from './compnents/search-bar/search-bar.component';


const routes: Routes = AppRoutes;

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    LoginComponent,
    DashboardComponent,
    NewPatientComponent,
    VisitsOverviewComponent,
    CreateVisitComponent,
    EditVisitComponent,
    ViewVisitComponent,
    CreateResultsComponent,
    EditResultsComponent,
    ViewResultsComponent,
    PatientsOverviewComponent,
    SearchBarComponent
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
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
