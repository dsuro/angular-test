import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { ApiGatewayService } from './api-gateway.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../constants/app-constants';

@Injectable()
export class CarService {
  private seriveName:string='CarService';
  constructor(private sharedService:SharedService,
    private apiGatewayService:ApiGatewayService) { }
    public getAllCars():Observable<Array<any>>
    {
      //console.log(userDto);
      let resourceUrl=this.sharedService.getResourceURL(AppConstants.CAR_SERVICE_URL);
      return this.apiGatewayService.get(this.seriveName,'getAllCars',resourceUrl,null)
                  .pipe(map(reponse =>reponse as Array<any>));
    }

    public getBrands():Observable<Array<any>>
    {
      //console.log(userDto);
      let resourceUrl=this.sharedService.getResourceURL(AppConstants.BRAND_SERVICE_URL);
      return this.apiGatewayService.get(this.seriveName,'getBrands',resourceUrl,null)
                  .pipe(map(reponse =>reponse as Array<any>));
    }
}
