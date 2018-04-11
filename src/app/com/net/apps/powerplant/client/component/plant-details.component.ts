import {Component, Input, OnInit} from '@angular/core';
import {Plant} from '../core/plant';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {PlantService} from '../rest/api/plant.service';
import {PlantType} from '../core/plantType';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-plant-details',
  templateUrl: '../view/plant-details/plant-details.component.html',
  styleUrls: ['../view/plant-details/plant-details.component.css']
})
export class PlantDetailsComponent implements OnInit {

  @Input() plant: Plant;
  selectedType: PlantType;
  plantsTypes$: Observable<PlantType[]>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private plantService: PlantService) { }

  ngOnInit(): void {
    this.getPlant();
    this.plantsTypes$ = this.plantService.getPlantsTypes1()
      .pipe(
        tap(_ => this.log(`fetched plant types`)),
        catchError(this.handleError<PlantType[]>('getPlantTypes', []))
      );
  }

  getPlant(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.plantService.getPlantById1(id)
      .pipe(
        tap(_ => this.log(`fetched plant id:${id}`)),
        catchError(this.handleError<Plant>('getPlant'))
      ).subscribe(plant => {
        this.plant = plant;
        this.selectedType = plant.type;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.plantService.updatePlant1(this.plant)
      .pipe(
        tap(_ => this.log(`update plant id:${this.plant.id}`)),
        catchError(this.handleError<Plant>('updatePlant1'))
      )
      .subscribe(() => this.goBack());
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
