import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { ApiGatewayService } from './api-gateway.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../constants/app-constants';

@Injectable()
export class CarService {
  constructor(private sharedService:SharedService,
    private apiGatewayService:ApiGatewayService) { }
    public getAllCars():Observable<Array<any>>
    {
      const resourceUrl=this.sharedService.getResourceURL(AppConstants.CAR_SERVICE_URL);
      return this.apiGatewayService.get(resourceUrl,null)
                  .pipe(map(reponse =>reponse as Array<any>));
    }
    public getBrands():Observable<Array<any>>
    {
      const resourceUrl=this.sharedService.getResourceURL(AppConstants.BRAND_SERVICE_URL);
      return this.apiGatewayService.get(resourceUrl,null)
                  .pipe(map(reponse =>reponse as Array<any>));
    }
}
