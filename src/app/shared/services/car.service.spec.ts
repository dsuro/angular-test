import { TestBed, getTestBed } from '@angular/core/testing';
import { CarService } from './car.service';
import { ApiGatewayService } from './api-gateway.service';
import { SharedService } from './shared.service';
import { asyncData } from '../testing/test-helper';
import * as mockData from './../constants/mock-data';

/*Test Suite */
describe('Service::CarService', () => {
  let service:CarService;
  let injector:TestBed;
  const apiGatewayServiceSpy = jasmine.createSpyObj('ApiGatewayService', ['get','post']);
  const sharedServiceSpy = jasmine.createSpyObj('SharedService', ['getResourceURL']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CarService,
        {provide:ApiGatewayService,useValue:apiGatewayServiceSpy},
        {provide:SharedService,useValue:sharedServiceSpy},
      ]
    });

    injector=getTestBed();
    sharedServiceSpy.getResourceURL.and.returnValue('/api');
    service=injector.get(CarService);
  });


  afterEach(()=>{
    service=null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getAllCars',()=>{
    apiGatewayServiceSpy.get.and.returnValue(asyncData(mockData.mockData.allCars));
    service.getAllCars().subscribe((response)=>{
      expect(response).toBeDefined();
      expect(response.length).toBeGreaterThan(0);
    });

  });

  
  it('should test getBrands',()=>{
    apiGatewayServiceSpy.get.and.returnValue(asyncData(mockData.mockData.allBrands));
    service.getBrands().subscribe((response)=>{
      expect(response).toBeDefined();
      expect(response.length).toBeGreaterThan(0);
    });

  });

});
