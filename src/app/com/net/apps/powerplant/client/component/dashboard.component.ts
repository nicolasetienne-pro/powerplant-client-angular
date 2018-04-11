import { Component, OnInit } from '@angular/core';
import {Plant} from '../core/plant';
import {PlantService} from '../rest/api/plant.service';
import {PlantType} from '../core/plantType';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../view/dashboard/dashboard.component.html',
  styleUrls: ['../view/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  plants$: Observable<Plant[]>;

  constructor(private plantService: PlantService) { }

  ngOnInit() {
    this.plants$ = this.plantService.getPlants1()
      .pipe(
        tap(_ => this.log(`fetched plants for current user`)),
        catchError(this.handleError<Plant[]>('getPlants', []))
      );
  }

  // getPlants(): void {
  //   this.plantService.getPlants1()
  //     .subscribe(plants => this.plants = plants.slice(0, 5));
  // }

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