
import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from '../shared/models/user-model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { CarService } from '../shared/services/car.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    currentUser: UserModel=null;
    currentUserSubscription: Subscription;
    carSubscrition:Subscription;
    brandsSubscrition:Subscription;
    users: UserModel[] = [];
    cars:Array<any>;
    carsOriginalList:Array<any>=[];
    carBrands=[];
    defaultBrand="ALL";
    constructor(private authenticationService: AuthenticationService,
        private carService:CarService
    ) 
    {

    }
    ngOnInit() {
        this.subscibeAll();
        this.getBrands();
        this.getAllCars();
    }
    subscibeAll(){
        this.currentUserSubscription = this.authenticationService.currentUser
        .subscribe(user => {
            if(user){
                this.currentUser = user;
            }
        });
    }
    getAllCars(){
        this.carSubscrition=this.carService.getAllCars()
        .subscribe((cars)=>{
            if(cars){
            //console.log(cars);
            this.cars=cars;
            this.carsOriginalList=JSON.parse(JSON.stringify(cars));
            }
        });
    }
    getBrands(){
        this.brandsSubscrition=this.carService.getBrands()
        .subscribe((brands)=>{
            if(brands){
                //console.log(brands);
                this.carBrands=brands;
                this.carBrands.unshift({"label":"ALL","value":"ALL"});
            }
        });
    }
    onBrandSelected(event){
        //console.log(event);
        if(event!="ALL"){
            const cars=this.carsOriginalList.filter((item)=>{
                return item['brand']==event;
            });
            //console.log(cars);
            this.cars=cars;
        }else{
            this.cars=[...this.carsOriginalList];
        }
    }
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        if(this.currentUserSubscription){
            this.currentUserSubscription.unsubscribe();
        }
        if(this.carSubscrition){
            this.carSubscrition.unsubscribe();
        }
        if(this.brandsSubscrition){
            this.brandsSubscrition.unsubscribe();
        }
    }
}
