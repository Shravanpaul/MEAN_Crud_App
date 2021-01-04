import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientViewComponent } from './patient-view/patient-view.component';


const routes: Routes = [
  {
    path: '',
    component: PatientListComponent
  },
  {
    path: 'patient-list',
    component: PatientListComponent
  },
  {
    path: 'patient-list',
    component: PatientListComponent
  },
  {
    path: 'patient-view/:id',
    component: PatientViewComponent
  },
  {
    path: 'create-new',
    component: CreatePatientComponent
  },
  {
    path: 'edit',
    component: EditUserComponent
  },
  {
    path: 'edit/:id',
    component: EditUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
