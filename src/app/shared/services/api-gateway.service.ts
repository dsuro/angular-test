/*Module Section */
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";
import {catchError,finalize} from 'rxjs/operators';
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
    handleError(error:any){
        const errorMsg=(error.message)?error.message:error.status?`${error.status} -${error.statusTexts}` :'Server error';
        return Observable.throw(errorMsg);
    }
}
