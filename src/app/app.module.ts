import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { httprequestor } from './services/httprequestor';
import { fitnesssessionmodels } from './sharedutils/fitnesssessionmodels';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { fitnessconstants } from './sharedutils/fitnessconstants'; 
import {LocationStrategy, HashLocationStrategy} from '@angular/common'; 
import { Interceptor } from './shared/Interceptor';
import { LoaderComponent } from './feature-module/common/loader/loader/loader.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [AppComponent,LoaderComponent], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    SharedModule,
    HttpClientModule,    
    NgApexchartsModule,
    FormsModule,
    MatSlideToggleModule
  ],
 
  providers: [
    httprequestor,
    fitnesssessionmodels,
    fitnessconstants,
    DatePipe, 
  //  { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
   {provide: LocationStrategy, useClass: HashLocationStrategy} 
    
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
