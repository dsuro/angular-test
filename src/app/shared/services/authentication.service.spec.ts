import { TestBed, getTestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { ApiGatewayService } from './api-gateway.service';
import { SharedService } from './shared.service';
import { asyncData } from '../testing/test-helper';

/*Test Suite */
describe('AuthenticationService', () => {
  let service:AuthenticationService;
  let injector:TestBed;
  const apiGatewayServiceSpy = jasmine.createSpyObj('ApiGatewayService', ['get','post']);
  const sharedServiceSpy = jasmine.createSpyObj('SharedService', ['getResourceURL']);
  const mockUser={
    "id":1,
    "username":"admin",
    "firstName":"admin",
    "lastName":"admin",
    "password":"admin",
    "token":"fake-jwt-token"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        {provide:ApiGatewayService,useValue:apiGatewayServiceSpy},
        {provide:SharedService,useValue:sharedServiceSpy},
      ]
    });

    injector=getTestBed();
    sharedServiceSpy.getResourceURL.and.returnValue('/api');
    service=injector.get(AuthenticationService);
  });


  afterEach(()=>{
    service=null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test login',()=>{
    apiGatewayServiceSpy.post.and.returnValue(asyncData(mockUser));
    const username="admin";
    const password="admin";
    service.login(username,password).subscribe((response)=>{
      expect(response).toBeDefined();
      expect(response['token']).toBeDefined();
    });
  });

  it('shoul test logout',()=>{
    service.logout();
    service.currentUserSubject.subscribe((response)=>{
      expect(response).toBeNull();
    });
  });

  it('shoul test currentUserValue',()=>{
    service.currentUserSubject.next(mockUser);
    service.currentUserSubject.subscribe((response)=>{
      expect(service.currentUserValue).toBeDefined();
      expect(service.currentUserValue.id).toBe(response.id);
    });
  });

});
