import { TestBed, getTestBed } from '@angular/core/testing';
import { ApiGatewayService } from './api-gateway.service';
import {HttpTestingController, HttpClientTestingModule} from "@angular/common/http/testing";
/*Test Suite */
describe('Service::ApiGatewayService', () => {
  let service:ApiGatewayService;
  let injector:TestBed;
  let mockHttp:HttpTestingController;
  const API_URL="/api";
  let resourceUrl="";
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [ApiGatewayService]
    });

    injector=getTestBed();
    service=injector.get(ApiGatewayService);
    mockHttp=injector.get(HttpTestingController);
  });

  afterEach(()=>{
    service=null;
    mockHttp.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test get', () => {
   resourceUrl="/testurl";
   const params={id:'123'};
   const mockResponse={
    "id":"123",
    "name":"Test data"
   };
   service.get(API_URL+resourceUrl,params).subscribe((response)=>{
    expect(response).toBeDefined();
   });
   const mockRequest=mockHttp.expectOne(API_URL+resourceUrl+"?id=123");
   expect(mockRequest.request.method).toBe('GET');
   expect(mockRequest.request.url).toBe(API_URL+resourceUrl);
   expect(mockRequest.request.params.toString()).toBe("id=123");
   mockRequest.flush(mockResponse);
  });

  it('should test post', () => {
    resourceUrl="/testurl";
    const requestPayload={id:'123'};
    const mockResponse={
     "id":"123",
     "name":"Test data"
    };
    service.post(API_URL+resourceUrl,null,requestPayload).subscribe((response)=>{
     expect(response).toBeDefined();
    });
    const mockRequest=mockHttp.expectOne(API_URL+resourceUrl);
    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.url).toBe(API_URL+resourceUrl);
    mockRequest.flush(mockResponse);
   });

  it('should test handleError with backend message', () => {
    resourceUrl="/testurl1";
    spyOn(console,'error');
    const mockResponse={status:500,statusText:'Internal Server Error'};
    let response=null;
    let errResponse=null;
    const data="Invalid data";
    service.post(API_URL+resourceUrl,null,data).subscribe((res)=>response=res,(err)=>errResponse=err);
    mockHttp.expectOne(API_URL+resourceUrl).flush(data,mockResponse);
    expect(response).toBeDefined();
    expect(errResponse).toBeDefined();
    expect(console.error).toHaveBeenCalled();
   });

  it('should test handleError with a client-side or network error occurred', () => {
    resourceUrl="/testurl2";
    spyOn(console,'error');
    service.get(API_URL+resourceUrl,null).subscribe((res) => {
        console.log(`in success:`, res);
    }, (error) => {
        console.log(`in error:`, error);
    });
    mockHttp.expectOne(API_URL+resourceUrl).error(new ErrorEvent('network error'));
    expect(console.error).toHaveBeenCalled();
   });
});
