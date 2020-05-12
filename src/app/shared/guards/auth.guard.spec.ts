import { TestBed, async} from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

/*Test Suite */
describe('Guard::AuthGuard', () => {
  let guard:AuthGuard;
  let injector:TestBed;
  const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['currentUserValue']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const routerStateSnapshotStub:any={snapshot:{},url:'/login'};
  const mockUser={
    "id":1,
    "username":"admin",
    "firstName":"admin",
    "lastName":"admin",
    "password":"admin",
    "token":"fake-jwt-token"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      providers:[
        AuthGuard,
        {provide:AuthenticationService,useValue:authenticationServiceSpy},
        {provide:Router,useValue:routerSpy},
      ]
    })
    .compileComponents();
  }));

  afterEach(()=>{
    guard=null;
  });

  it('should be created', () => {
    authenticationServiceSpy.currentUserValue=null;
    guard=new AuthGuard(routerSpy,authenticationServiceSpy);
    expect(guard).toBeTruthy();
  });

  it('should test already logged-in user', () => {
    authenticationServiceSpy.currentUserValue=mockUser;
    guard=new AuthGuard(routerSpy,authenticationServiceSpy);
    const canActivate$=guard.canActivate(routerStateSnapshotStub,routerStateSnapshotStub);
    expect(canActivate$).toBeTruthy();
  });

  it('should test login', () => {
    authenticationServiceSpy.currentUserValue=null;
    guard=new AuthGuard(routerSpy,authenticationServiceSpy);
    const canActivate$=guard.canActivate(routerStateSnapshotStub,routerStateSnapshotStub);
    expect(canActivate$).toBeFalsy();
    const navArgs=routerSpy.navigate.calls.first().args[0];
    expect(navArgs).toEqual([ '/login' ]);
  });
});
