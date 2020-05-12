/*Module Section */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { routing } from '../app.routing';
/*Service Section*/
import { JwtInterceptor } from './helper/jwt-interceptor';
import { ErrorInterceptor } from './helper/error-interceptor';
import { fakeBackendProvider } from './helper/fake-backend-interceptor';
import { SharedService } from './services/shared.service';
import { ApiGatewayService } from './services/api-gateway.service';
import { AuthenticationService } from './services/authentication.service';
import { CarService } from './services/car.service';
/*Component Section*/
import { SingleSelectDropdownListComponent } from './components/single-select-dropdown-list/single-select-dropdown-list.component';
/*Directive Section*/
import { RowHoverDirective } from './directives/row-hover.directive';
/*Pipe Section*/
import { CarColorPipe } from './pipes/car-color.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    TabsModule.forRoot(),
    TableModule,
    DropdownModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    TableModule,
    DropdownModule,
    SingleSelectDropdownListComponent,
    CarColorPipe,
    RowHoverDirective
  ],
  declarations: [
    SingleSelectDropdownListComponent,
    CarColorPipe,
    RowHoverDirective
  ]
})
export class SharedModule { 

  public static forRoot(): ModuleWithProviders 
  {
    return {
      ngModule: SharedModule, 
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        fakeBackendProvider,
        SharedService,
        ApiGatewayService,
        AuthenticationService,
        CarService
      ]
    };
  }
}
