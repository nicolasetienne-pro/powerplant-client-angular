import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlantsComponent} from './component/plants.component';
import {DashboardComponent} from './component/dashboard.component';
import {PlantDetailsComponent} from './component/plant-details.component';
import {UsersComponent} from './component/users.component';
import {LoginComponent} from './component/login.component';
import {AuthGuard} from './component/auth.guard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: UsersComponent },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'detail/:id', component: PlantDetailsComponent, canActivate: [AuthGuard] },
  { path: 'plants', component: PlantsComponent, canActivate: [AuthGuard] },

  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
