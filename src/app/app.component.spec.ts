import { TestBed, async, ComponentFixture, getTestBed, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserModel } from './shared/models/user-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

/*Mock Services */
class MockAuthenticationService{
  public currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;
  constructor() {
     
  }
  sendUser(user){
    this.currentUserSubject = new BehaviorSubject<UserModel>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  logout(){

  }
}
/*Test Suite */
describe('Component::AppComponent', () => {
  let injector:TestBed;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authenticationService:MockAuthenticationService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
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
      imports:[RouterTestingModule],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA],
      declarations: [
        AppComponent,
      ],
      providers:[
        {provide:AuthenticationService,useClass:MockAuthenticationService},
        {provide:Router,useValue:routerSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector=getTestBed();
    authenticationService=injector.get(AuthenticationService);
    authenticationService.sendUser(mockUser);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    authenticationService=null;
    fixture.destroy();
  });

  it('should create',fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should test logout', () => {
    component.logout();
    fixture.detectChanges();
    const navArgs=routerSpy.navigate.calls.first().args[0];
    expect(navArgs).toEqual([ '/login' ]);
  });

});
