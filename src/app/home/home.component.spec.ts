import { async, ComponentFixture, TestBed, getTestBed, fakeAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MockSingleSelectDropdownListComponent, MockPrimeTableComponent, MockCarColorPipe, asyncData, advance } from '../shared/testing/test-helper';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { CarService } from '../shared/services/car.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from '../shared/models/user-model';
import * as mockData from './../shared/constants/mock-data';

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
}
/*Test Suite */
describe('Component::HomeComponent', () => {
  let injector:TestBed;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const carServiceSpy = jasmine.createSpyObj('CarService', ['getAllCars','getBrands']);
  let authenticationService:MockAuthenticationService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA],
      declarations: [ 
        HomeComponent,
        MockSingleSelectDropdownListComponent,
        MockPrimeTableComponent,
        MockCarColorPipe
      ],
      providers:[
        {provide:AuthenticationService,useClass:MockAuthenticationService},
        {provide:CarService,useValue:carServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    injector=getTestBed();
    authenticationService=injector.get(AuthenticationService);
    authenticationService.sendUser(null);
    carServiceSpy.getAllCars.and.returnValue(asyncData(null));
    carServiceSpy.getBrands.and.returnValue(asyncData(null));
    fixture = TestBed.createComponent(HomeComponent);
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

  it('should test subscibeAll',fakeAsync(() => {
    authenticationService.sendUser({
      id: 2,
      username: 'admin',
      firstName: 'admin',
      lastName:  'admin',
      token: 'fake-jwt-token'
    });
    component.subscibeAll();
    advance(fixture);
    fixture.whenStable().then(()=>{
      expect(component.cars.length).toBeGreaterThan(0);
    });
  }));

  it('should test getAllCars',fakeAsync(() => {
    carServiceSpy.getAllCars.and.returnValue(asyncData(mockData.mockData.allCars));
    component.getAllCars();
    advance(fixture);
    fixture.whenStable().then(()=>{
      expect(component.cars.length).toBeGreaterThan(0);
    });
  }));

  it('should test getBrands',fakeAsync(() => {
    carServiceSpy.getBrands.and.returnValue(asyncData(mockData.mockData.allCars));
    component.getBrands();
    advance(fixture);
    fixture.whenStable().then(()=>{
      expect(component.carBrands.length).toBeGreaterThan(0);
    });
  }));

  it('should test onBrandSelected',()=>{
    component.carsOriginalList=mockData.mockData.allCars;
    const event="Audi";
    component.onBrandSelected(event);
    fixture.detectChanges();
    expect(component.cars.length).toBe(1);
  });

  it('should test onBrandSelected for ALL',()=>{
    component.carsOriginalList=mockData.mockData.allCars;
    const event="ALL";
    component.onBrandSelected(event);
    fixture.detectChanges();
    expect(component.cars.length).toBe(component.carsOriginalList.length);
  });

  it('should test ngOnDestroy',()=>{
    component.carSubscrition=null;
    component.brandsSubscrition=null;
    component.currentUserSubscription=null;
    component.ngOnDestroy();
    expect(component.carSubscrition).toBeNull();
    expect(component.brandsSubscrition).toBeNull();
    expect(component.currentUserSubscription).toBeNull();
  });

});
