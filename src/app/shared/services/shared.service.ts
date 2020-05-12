import { Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
  private isApiRequest$=new BehaviorSubject({isApiRequest:false});
  private userToken:String='';
  constructor() { }
  getResourceURL(resource):string
  {
    return environment.BASE_SERVICE_URL+resource;
  }
  setUserToken(userToken)
  {
    this.userToken=userToken;
  }
  getUserToken():String{
    return this.userToken;
  }
  sendApiRequest(isApiRequest){
    this.isApiRequest$.next({isApiRequest:isApiRequest});
  }
  receiveApiRequest(){
      return this.isApiRequest$.asObservable();
  }
}
