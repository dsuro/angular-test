/*Module Section */
import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {catchError,finalize} from 'rxjs/operators';
import 'rxjs/add/observable/throw';
/*Service Section*/

@Injectable()
export class ApiGatewayService {
    constructor(private http: HttpClient) {
        
    }
    public get(url: string, params: any): Observable<any> {
      const httpParams=this.buildHttpParamsFromObject(params);
      return this.request('GET',url,httpParams);
    }
    public post(url: string, params?: any,data?: any, ): Observable<any> {
        const httpParams=this.buildHttpParamsFromObject(params);
        const body=JSON.stringify(data);
        return this.request('POST',url,httpParams,body);
    }
    private request(method:string,url: string,params?: any,data?: any): Observable<any> {
        const stream = this.http.request(method,url,{responseType:'json',params,body:data})
            .pipe(
                catchError((error:any)=>this.handleError(error)),
                finalize(()=>{
                })
            );

        return stream;
    }
    private buildHttpParamsFromObject(params){
        if(!params)
        {
            return new HttpParams({});
        }
        return Object.getOwnPropertyNames(params).reduce((p,key)=> p.set(key,params[key]),new HttpParams());
    }
    handleError(errorResponse : any){
        let errorMsg;
        //console.log(errorResponse);
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMsg = `An error occurred: ${errorResponse.error.message}`;
        } else{
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMsg = `Backend returned code ${errorResponse.status}, message was: ${errorResponse.statusText}`;
        }
        console.error(errorMsg);
        return Observable.throw(errorMsg);
    }
}
