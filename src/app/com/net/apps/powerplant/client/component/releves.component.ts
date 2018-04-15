import {Component, Input, OnInit} from '@angular/core';
import {Plant} from '../core/plant';
import {ReleveService} from '../service/releve.service';
import {Observable} from 'rxjs/Observable';
import {Releve} from '../core/releve';
import {LogService} from '../service/log.service';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'app-releves',
  templateUrl: '../view/releves/releves.component.html',
  styleUrls: ['../view/releves/releves.component.css']
})
export class RelevesComponent implements OnInit {

  @Input() plant: Plant;

  releves: Releve[];

  constructor(private releveService: ReleveService, private logService: LogService) { }

  ngOnInit() {
      this.releveService.getReleves1(this.plant.id, -1)
        .pipe(
          tap(_ => this.logService.add(`fetched releves`)),
          catchError(this.handleError('getReleves', [])))
        .subscribe(releves => this.releves = releves);
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
      this.logService.add(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
