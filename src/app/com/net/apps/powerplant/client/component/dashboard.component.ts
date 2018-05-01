import {Component, OnDestroy, OnInit} from '@angular/core';
import {Plant} from '../core/plant';
import {PlantService} from '../service/plant.service';
import {catchError, share, tap} from 'rxjs/operators';
import {ReleveService} from '../service/releve.service';
import {Releve} from '../core/releve';
import {LogService} from '../service/log.service';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ISubscription} from 'rxjs/Subscription';
import {User} from '../core/user';
import {UserService} from '../service/user.service';
import {PlantsComponent} from './plants.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../view/dashboard/dashboard.component.html',
  styleUrls: ['../view/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;

  public plants: Plant[];
  public selectedPlant: Plant;
  public currentUser: User;
  public valueReleve;
  public dateReleve: NgbDateStruct;

  constructor(private plantService: PlantService,
              private releveService: ReleveService,
              private userService: UserService,
              private modalService: NgbModal,
              private logService: LogService) {
  }

  public ngOnInit() {
    const now = new Date();
    this.dateReleve = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.subscription = this.plantService.getPlants1()
      .pipe(
        tap(_ => this.logService.log(`fetched plants for current user`)),
        catchError(this.logService.handleError<Plant[]>('getPlants', [])))
      .subscribe(
        (_plants: Plant[]) => {
          this.plants = _plants;
        }
      );

    let logMessage = `fetch current user login=${this.userService.configuration.username}`;
    this.subscription = this.userService.getUserByName1(this.userService.configuration.username)
      .pipe(
        tap(_ => this.logService.log(logMessage)),
        catchError(this.logService.handleError<any>(logMessage)),
        share()
      ).subscribe(user => this.currentUser = user);

  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public save(): void {
    //La méthode getMonth() retourne le mois de la date renseignée d'après l'heure locale.
    // La numérotation démarre à 0 (c'est-à-dire que 0 correspond au premier mois de l'année).
    let dt = new Date(Date.UTC(this.dateReleve.year, this.dateReleve.month - 1, this.dateReleve.day, 0, 0));
    this.logService.log('date releve ' + dt.toISOString());
    let releve: Releve = {
      timestamp: dt,
      indexCompteur: this.valueReleve,
      plantId: this.selectedPlant.id,
      userId: this.currentUser.id
    };

    this.subscription = this.releveService.addReleve1(releve)
      .pipe(
        tap((_releve: Releve) => this.logService.log(`added releve  id=${_releve.id}`)),
        catchError(this.logService.handleError<Plant>('addReleve'))
      )
      .subscribe(() => {
        this.selectedPlant = null;
        // if (this.plants) {
        //   this.plants
        //     .filter(plant => plant.id === releve.plantId)
        //     .forEach(plant => plant.consumptions.push(releve));
        // }
      });
  }

  public open(content) {
    this.modalService.open(content, {backdropClass: 'light-backdrop'})
      .result.then(
      (result) => {
        this.save();
      },
      (reason) => {
        // Dismiss Cross
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  public openCentrale(): void {
    this.modalService.open(PlantsComponent);
  }
}
