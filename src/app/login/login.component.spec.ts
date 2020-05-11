import { async, ComponentFixture, TestBed, getTestBed, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../shared/models/user-model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { asyncData, asyncError, advance, MockActivatedRoute } from '../shared/testing/test-helper';

/*Test Suite */
describe('Component::LoginComponent', () => {
  let injector:TestBed;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['currentUserValue','login']);
  const mockUser={
    "id":1,
    "username":"admin",
    "firstName":"admin",
    "lastName":"admin",
    "password":"admin",
    "token":"fake-jwt-token"
  };
  let activatedRouteStub: MockActivatedRoute;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA],
      declarations: [ LoginComponent ],
      providers:[
        {provide:AuthenticationService,useValue:authenticationServiceSpy},
        {provide:Router,useValue:routerSpy},
        {provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //injector=getTestBed();
    //authenticationService=injector.get(AuthenticationService);
    //authenticationService.sendUser(null);
    activatedRouteStub = new MockActivatedRoute();
    activatedRouteStub.testParams = {
      returnUrl: 'home'
    };
    authenticationServiceSpy.currentUserValue.and.returnValue(null);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    //authenticationService=null;
    fixture.destroy();
  });

  function updateForm(username,password){
    component.loginForm.controls['username'].setValue(username);
    component.loginForm.controls['password'].setValue(password);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test returnUrl', () => {
    authenticationServiceSpy.currentUserValue.and.returnValue(null);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.returnUrl).toBe('home');
  });

  it('should test navigate for already logged-in user', () => {
    authenticationServiceSpy.currentUserValue.and.returnValue(mockUser);
    component.ngOnInit();
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalled();
  });

  it('should test blank user', () => {
    updateForm(null,null);
    component.onSubmit();
    fixture.detectChanges();
    expect(component.loginFailed).toBeTruthy();
  });

  it('should test valid user', fakeAsync(() => {
    authenticationServiceSpy.login.and.returnValue(asyncData(mockUser));
    updateForm("admin","admin");
    component.onSubmit();
    advance(fixture);
    fixture.whenStable().then(()=>{
      expect(component.loginFailed).toBeFalsy();
      expect(routerSpy.navigate).toHaveBeenCalled();
    });
  }));

  it('should test valid user with service error', fakeAsync(() => {
    authenticationServiceSpy.login.and.returnValue(asyncError({status:500}));
    updateForm("admin","admin");
    component.onSubmit();
    advance(fixture);
    fixture.whenStable().then(()=>{
      expect(component.loginFailed).toBeTruthy();
    });
  }));
});
