import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {LoginComponent} from './component/login.component';
import {Configuration} from './configuration';
import {AuthGuard} from './component/auth.guard.component';
import {UserDetailsComponent} from './component/user-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const configurationFactory = () => new Configuration({
  apiKeys: {},
  basePath: "http://localhost:8080/api"
});

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailsComponent,
    PlantsComponent,
    PlantDetailsComponent,
    DashboardComponent,
    RelevesComponent,
    LoginComponent,
    LogComponent
  ],
  imports: [
    NgbModule.forRoot(),

    BrowserModule, FormsModule, ReactiveFormsModule,

    ApiModule.forRoot(configurationFactory),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    LogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
