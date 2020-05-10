/*Module Section */
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
/*Service Section*/
import { ErrorService } from './error.service';

export type HandleError = <T> (methodName?: string, result?: T) => 
(error: HttpErrorResponse) => Observable<T>;

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor(private errorService: ErrorService) { }
 
  /** Create handleError function that already knows the service name */
  createHandleError = (serviceName = '') => <T>
    (methodName = 'methodName', result = {} as T) => this.handleError(serviceName, methodName, result);
 
  /**
   * @param serviceName: name of the data service
   * @param methodName: name of the failed methodName
   * @param result: optional value to return as the observable result
   */
  handleError<T> (serviceName = '', methodName = 'methodName', result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      //console.error(error); // log to console instead
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `{error code: ${error.status}, body: "${error.message}"}`;
      this.errorService.errorMessage = `${serviceName} -> ${methodName} failed.\n  Message: ${message}`;
      console.error(this.errorService.errorMessage); 
      // -> Return a safe result.
      return of(result);
    };
  }
}
