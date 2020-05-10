/*Module Section */
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";
import {catchError,finalize} from 'rxjs/operators';
/*Service Section*/
import { SharedSubscriptionService } from './shared-subscription.service';
import { HttpErrorHandlerService, HandleError } from './http-error-handler.service';


export class ApiGatewayOptions {  
  method: string;
  url: string;
  serviceMethod:string;
  params:HttpParams= new HttpParams();
  headers:HttpHeaders=new HttpHeaders();
  data:any;
}
export class HttpClientRequestOptions{
    params:HttpParams= new HttpParams();
    headers:HttpHeaders=new HttpHeaders();
    body:any;
}
@Injectable()
export class ApiGatewayService {
    private ongoingRequestCount:number =0;
    private handleError: HandleError;
    constructor(private http: HttpClient,
      private httpErrorHandlerService: HttpErrorHandlerService,
      private sharedSubscriptionService:SharedSubscriptionService) {
        
    }
    // To perform a GET request to the API, appending the given params
    // as URL search parameters. Returns a stream.
    public get(serviceName:string,methodName:string,url: string, params: any): Observable<any> {
        let options = new ApiGatewayOptions();
        options.method ="GET";
        options.url = url;
        options.params = params;
        options.serviceMethod=methodName;
        this.handleError = this.httpErrorHandlerService.createHandleError(serviceName);
        return this.request(options);
    }
    // To perform a POST request to the API. If both the params and data
    // are present, the params will be appended as URL search parameters
    // and the data will be serialized as a JSON payload. If only the
    // data is present, it will be serialized as a JSON payload. Returns
    // a stream.
    public post(serviceName:string,methodName:string,url: string, data: any, params?: any): Observable<any> {
        if (!data) {
            data = params;
            params = {};
        }
        let options = new ApiGatewayOptions();
        options.method ="POST";
        options.url = url;
        options.params = params;
        options.serviceMethod=methodName;
        options.data = data;
        this.handleError = this.httpErrorHandlerService.createHandleError(serviceName);
        return this.request(options);
    }
    private request(options: ApiGatewayOptions): Observable<any> {
        this.ongoingRequestCount++;
        let requestOptions = new HttpClientRequestOptions();
        requestOptions.params = this.buildHttpParamsFromObject(options.params);
        requestOptions.headers = options.headers;
        requestOptions.body = JSON.stringify(options.data);
        this.sharedSubscriptionService.sendApiRequest(true);
        let stream = this.http.request(options.method,options.url,requestOptions)
            .pipe(
                catchError(this.handleError(options.serviceMethod, null)),
                finalize(()=>{
                    this.ongoingRequestCount--;
                    if(this.ongoingRequestCount<=0){
                        this.sharedSubscriptionService.sendApiRequest(false);
                    }
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
}
