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
import { VisitDetailComponent } from './pages/visit/visit-detail/visit-detail.component';
import { CustomMaterialModule } from './helpers/custom-material/custom-material.module';
import { MAT_DATE_LOCALE } from '@angular/material';
import { CreateNewLabVisitComponent } from './pages/visit/edit/edit';
import { EnterTestResultsComponent } from './pages/visit/results/results';
import { VisitsOverviewComponent } from './pages/visit/visits/visits';
import { NewPatientComponent } from './pages/patient/new/new';
import { NewLabVisitComponent } from './pages/visit/add/add';


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
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
