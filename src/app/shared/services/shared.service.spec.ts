import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { environment } from '../../../environments/environment';

/*Test Suite */
describe('Service::SharedService', () => {
  let service:SharedService;
  let injector:TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SharedService
      ]
    });

    injector=getTestBed();
    service=injector.get(SharedService);
  });


  afterEach(()=>{
    service=null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getResourceURL',()=>{
    const baseUrl=environment.BASE_SERVICE_URL;
    const resource="test";
    expect(service.getResourceURL(resource)).toBe(baseUrl+resource);
  });

  it('should test setUserToken/getUserToken',()=>{
    const userToken="test";
    service.setUserToken(userToken);
    const response=service.getUserToken();
    expect(response).toBe(userToken);
  });

  it('shoul test sendApiRequest/receiveApiRequest',()=>{
    service.sendApiRequest(true);
    service.receiveApiRequest().subscribe((message)=>{
      expect(message.isApiRequest).toBeTruthy();
     });
  });
});
