import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './component/app.component';
import { UsersComponent } from './component/users.component';
import { PlantsComponent } from './component/plants.component';
import { PlantDetailsComponent } from './component/plant-details.component';
import { DashboardComponent } from './component/dashboard.component';
import {PlantService} from './rest/api/plant.service';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PlantsComponent,
    PlantDetailsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PlantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
