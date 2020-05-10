/*Module Section */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedSubscriptionService {
 private selectedWidget$=new BehaviorSubject({});
 private isApiRequest$=new BehaviorSubject({isApiRequest:false});
 private isAppAdded$=new BehaviorSubject({isAppAdded:false});
 private isTabChange$=new BehaviorSubject({isTabChange:false});

 constructor() { }
 sendWidgetSelected(selectedWidget)
 {
  this.selectedWidget$.next({selectedWidget:selectedWidget});
 }
 receiveWidgetSelected()
 {
  return this.selectedWidget$.asObservable();
 }
 sendApiRequest(isApiRequest){
    this.isApiRequest$.next({isApiRequest:isApiRequest});
 }
 receiveApiRequest(){
    return this.isApiRequest$.asObservable();
 }
 sendAppAdded(isAppAdded){
    this.isAppAdded$.next({isAppAdded:isAppAdded});
 }
 receiveAppAdded(){
    return this.isAppAdded$.asObservable();
 }
 sendIsTabChange(isTabChange){
    this.isTabChange$.next({isTabChange:isTabChange});
 }
 recieveIsTabChange(){
    return this.isTabChange$.asObservable();
 }
}