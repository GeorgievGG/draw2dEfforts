import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DevicesService } from '../services/devices.service';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DevicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
