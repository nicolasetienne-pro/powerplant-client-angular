import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';


@Injectable()
export class LogService {

  messages: any[] = [];

  log(message: string | any) {
    this.messages.push("> " + message);
    console.log('LogService: ' + message);
    // <pre>Model: {{ model | json }}</pre>
  }

  clear() {
    this.messages = [];
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
