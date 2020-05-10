import { Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppConstants } from '../constants/app-constants';

@Injectable()
export class SharedService {
  private userToken:String='';//YWRtaW4=
  private isInEditMode:Boolean=false;
  constructor() { }
  getResourceURL(resource):string
  {
    return environment.BASE_SERVICE_URL+resource;
  }
  interpolation(input:string,expression:any):string
  {
    let modifiedStr:string=input;
    if(typeof expression!=undefined && expression!=null)
    {
      for(let key in expression)
      {
        let val=expression[key];
        key="{{"+key+"}}";
        modifiedStr=modifiedStr.replace(key,val);
      }
    }
    console.log(modifiedStr);
    return modifiedStr;
  }
  setUserToken(userToken)
  {
    this.userToken=userToken;
  }
  getUserToken():String{
    return this.userToken;
  }
  setIsInEditMode(isInEditMode){
    this.isInEditMode=isInEditMode;
  }
  getIsInEditMode():Boolean{
    return this.isInEditMode;
  }
}
