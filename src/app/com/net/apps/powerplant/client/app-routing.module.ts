import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlantsComponent} from './component/plants.component';
import {DashboardComponent} from './component/dashboard.component';
import {PlantDetailsComponent} from './component/plant-details.component';
import {UsersComponent} from './component/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: PlantDetailsComponent },
  { path: 'plants', component: PlantsComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
