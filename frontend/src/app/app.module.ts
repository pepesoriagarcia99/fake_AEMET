import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, HttpClientModule],
  providers: [
    provideAnimations()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
