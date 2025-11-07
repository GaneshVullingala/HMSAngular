import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { Home } from './Component/home/home';
import { DoctorListComponent } from './Component/doctor-list.component/doctor-list.component';
import { ForntDesk } from './Component/fornt-desk/fornt-desk';
import { PatientComponent } from './Component/patient/patient';
import { LoginComponent } from './Component/login-component/login-component';
import { FrontdeskDashboardComponent } from './Component/frontdesk-dashboard-component/frontdesk-dashboard-component';
import { AdminDashboardComponent } from './Component/admin-dashboard-component/admin-dashboard-component';
import { Unauthorized } from './Component/unauthorized/unauthorized';
import { DoctorDashboardComponent } from './Component/doctor-dashboard-component/doctor-dashboard-component';
import { DoctorAllConsultations } from './Component/doctor-all-consultations/doctor-all-consultations';
import {DoctorUpdateConsultation} from './Component/doctor-update-consultation/doctor-update-consultation';

export const routes: Routes = [
    {   path: '',
        redirectTo : 'login',
        pathMatch: 'full'
    },
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path: 'frontdesk',
        component : PatientComponent,
        canActivate : [AuthGuard, RoleGuard],
        data : {
            roles : ['FrontDesk', 'Admin']
        }
    },
    {
        path : 'doctor',
        component : DoctorDashboardComponent,
        canActivate : [AuthGuard, RoleGuard],
        data : {
            roles : ['Doctor']  
        }
    },
    {
        path : 'patient',
        component : PatientComponent,
        canActivate : [AuthGuard, RoleGuard],
        data : {
            roles : ['Patient']  
        }
    },
    {
        path : 'admin',
        component: AdminDashboardComponent,
        canActivate : [AuthGuard, RoleGuard],
        data : {
            roles : ['Admin']
        }
    },
    {
        path : 'doctors/consultations',
        component : DoctorAllConsultations,
        canActivate : [AuthGuard, RoleGuard],
        data : {
            roles : ['Doctor']
        }
    },
    {
        path : 'unauthorized',
        component : Unauthorized
    },
    {
        path : 'doctor/consultation-detail',
        component : DoctorUpdateConsultation,
        canActivate : [AuthGuard, RoleGuard],
         data : {
            roles : ['Doctor']
        }
    },
    {
        path : 'doctor/consultation-detail/:consultationId',
        component : DoctorUpdateConsultation,
        canActivate : [AuthGuard, RoleGuard],
    },
      { path: '**', redirectTo: '' } // catch-all
];
