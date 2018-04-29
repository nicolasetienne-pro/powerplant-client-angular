import {Component, OnInit} from '@angular/core';
import {Plant} from '../core/plant';
import {PlantService} from '../service/plant.service';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {ReleveService} from '../service/releve.service';
import {Releve} from '../core/releve';
import {LogService} from '../service/log.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../view/dashboard/dashboard.component.html',
  styleUrls: ['../view/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  plants$: Observable<Plant[]>;
  selectedPlant: Plant;

  constructor(private plantService: PlantService, private releveService: ReleveService, private logService: LogService) { }

  ngOnInit() {
    this.plants$ = this.plantService.getPlants1()
      .pipe(
        tap(_ => this.logService.log(`fetched plants for current user`)),
        catchError(this.handleError<Plant[]>('getPlants', []))
      );
  }

  // getPlants(): void {
  //   this.plantService.getPlants1()
  //     .subscribe(plants => this.plants = plants.slice(0, 5));
  // }

  save(releve: number, date: Date): void {
    this.releveService.addReleve1({timestamp: date, indexCompteur: releve, plantId: this.selectedPlant.id, userId: -1} as Releve)
      .pipe(
        tap((_releve: Releve) => this.logService.log(`added releve w/ id=${_releve.id}`)),
        catchError(this.handleError<Plant>('addReleve'))
      )
      .subscribe(() => this.selectedPlant = null);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.logService.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
