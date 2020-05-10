
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
    currentUser: UserModel;
    currentUserSubscription: Subscription;
    private carSubscrition:Subscription;
    private brandsSubscrition:Subscription;
    users: UserModel[] = [];
    cars:Array<any>;
    carsOriginalList:Array<any>=[];
    carBrands=[];
    defaultBrand="ALL";
    constructor(private authenticationService: AuthenticationService,
        private carService:CarService
    ) 
    {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }
    ngOnInit() {
        
        this.getBrands();
        this.getAllCars();
    }
    getAllCars(){
        this.carSubscrition=this.carService.getAllCars()
        .subscribe((cars)=>{
          console.log(cars);
          this.cars=cars;
          this.carsOriginalList=JSON.parse(JSON.stringify(cars));
        });
    }
    getBrands(){
        this.brandsSubscrition=this.carService.getBrands()
        .subscribe((brands)=>{
          console.log(brands);
          this.carBrands=brands;
          this.carBrands.unshift({"label":"ALL","value":"ALL"});
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
        this.currentUserSubscription.unsubscribe();
        if(this.carSubscrition){
            this.carSubscrition.unsubscribe();
        }
    }
}
