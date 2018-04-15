import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from './api.module'


import { AppComponent } from './component/app.component';
import { UsersComponent } from './component/users.component';
import { PlantsComponent } from './component/plants.component';
import { PlantDetailsComponent } from './component/plant-details.component';
import { DashboardComponent } from './component/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import {RelevesComponent} from './component/releves.component';
import {LogService} from './service/log.service';
import {LogComponent} from './component/log.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PlantsComponent,
    PlantDetailsComponent,
    DashboardComponent,
    RelevesComponent,
    LogComponent
  ],
  imports: [
    ApiModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    LogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
