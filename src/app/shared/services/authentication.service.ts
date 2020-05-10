import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user-model';
import { SharedService } from './shared.service';
import { ApiGatewayService } from './api-gateway.service';

@Injectable()
export class AuthenticationService {
    private seriveName:string='AuthenticationService';
    private currentUserSubject: BehaviorSubject<UserModel>;
    public currentUser: Observable<UserModel>;

    constructor(private sharedService:SharedService,
        private apiGatewayService:ApiGatewayService) {
        this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserModel {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        const resourceUrl=this.sharedService.getResourceURL('users/authenticate');
        return this.apiGatewayService.post(this.seriveName,'login',resourceUrl, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
