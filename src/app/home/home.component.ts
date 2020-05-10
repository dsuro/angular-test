
import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../shared/models/user-model';
import { UserService } from '../shared/services/user.service';
import { AuthenticationService } from '../shared/services/authentication.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    currentUser: UserModel;
    currentUserSubscription: Subscription;
    users: UserModel[] = [];
    cars=[ 
    {"brand": "VW", "year": 2012, "color": "Orange", "modelNo": "A001"},
    {"brand": "Audi", "year": 2011, "color": "Black", "modelNo": "A002"},
    {"brand": "Renault", "year": 2005, "color": "Gray", "modelNo": "A003"},
    {"brand": "BMW", "year": 2003, "color": "Blue", "modelNo": "A004"},
    {"brand": "Mercedes", "year": 1995, "color": "Orange", "modelNo": "A005"},
    {"brand": "Volvo", "year": 2005, "color": "Black", "modelNo": "A006"},
    {"brand": "Honda", "year": 2012, "color": "Yellow", "modelNo": "A007"},
    {"brand": "Jaguar", "year": 2013, "color": "Orange", "modelNo": "A008"},
    {"brand": "Ford", "year": 2000, "color": "Black", "modelNo": "A009"},
    {"brand": "Fiat", "year": 2013, "color": "Red", "modelNo": "A010"}];
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}
