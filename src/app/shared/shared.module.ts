/*Module Section */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {TableModule} from 'primeng/table';
/*Service Section*/
import { JwtInterceptor } from './helper/jwt-interceptor';
import { ErrorInterceptor } from './helper/error-interceptor';
import { fakeBackendProvider } from './helper/fake-backend-interceptor';
/*Component Section*/
import { routing } from '../app.routing';

/*Directive Section*/

/*Pipe Section*/

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
    TableModule
  ],
  exports:[
    FormsModule,
    TabsModule,
    TableModule,
    ReactiveFormsModule
  ],
  declarations: [

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

        // provider used to create fake backend
        fakeBackendProvider
      ]
    };
  }
}
