import { Component, OnInit } from '@angular/core';
import {Plant} from '../core/plant';
import {PlantService} from '../service/plant.service';
import {PlantType} from '../core/plantType';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-plants',
  templateUrl: '../view/plants/plants.component.html',
  styleUrls: ['../view/plants/plants.component.css']
})
export class PlantsComponent implements OnInit {

  plants: Plant[];
  plantsTypes$: Observable<PlantType[]>;
  plantType: PlantType;

  constructor(private plantService: PlantService) { }

  ngOnInit() {
    this.getPlants();
    this.plantsTypes$ = this.plantService.getPlantsTypes1()
      .pipe(
        tap(_ => this.log(`fetched plant types`)),
        catchError(this.handleError<PlantType[]>('getPlantTypes', []))
      );
  }

  getPlants(): void {
    this.plantService.getPlants1()
      .pipe(
        tap(heroes => this.log(`fetched plants`)),
        catchError(this.handleError('getPlants', []))
      ).subscribe(plants => this.plants = plants);
  }

  add(name: string, type: PlantType, capacity: number): void {
    name = name.trim();
    if (!name) { return; }
    this.plantService.addPlant1({ name: name, type: type, capacity: capacity } as Plant)
      .pipe(
        tap((_plant: Plant) => this.log(`added plant w/ id=${_plant.id}`)),
        catchError(this.handleError<Plant>('addPlant'))
      )
      .subscribe(_plant => {
        this.plants.push(_plant);
      });
  }

  delete(plant: Plant): void {
    this.plants = this.plants.filter(p => p !== plant);
    this.plantService.deletePlant1(plant.id)
      .pipe(
        tap(_ => this.log(`deleted plant id=${plant.id}`)),
        catchError(this.handleError<Plant>('deletePlant'))
      ).subscribe();
  }


  /** Log a message */
  private log(message: string) {
    // this.messageService.add('LogService: ' + message);
    console.log('PlantService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
