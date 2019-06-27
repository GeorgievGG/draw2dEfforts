import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DevicesService } from '../services/devices.service';
import { Draw2DService } from '../services/draw2d.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [DevicesService, Draw2DService],
  bootstrap: [AppComponent]
})
export class AppModule { }
