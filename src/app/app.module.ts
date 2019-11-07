import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './main/login/login.component';
import { JoinComponent } from './main/join/join.component';
import { ErrorComponent } from './common/error/error.component';
import { HomeComponent } from './main/home/home.component';
import { TopbarComponent } from './main/general/topbar/topbar.component';
import { CarouselComponent } from './main/home/editorial/carousel/carousel.component';
import { PhotogridsComponent } from './main/home/photogrids/photogrids.component';
import { SponsoreFigureComponent } from './main/home/photogrids/sponsore-figure/sponsore-figure.component';
import { BasicFigureComponent } from './main/home/photogrids/basic-figure/basic-figure.component';
import { UploadModalComponent } from './main/general/upload-modal/upload-modal.component';
import { FooterComponent } from './main/general/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JoinComponent,
    ErrorComponent,
    HomeComponent,
    TopbarComponent,
    CarouselComponent,
    PhotogridsComponent,
    SponsoreFigureComponent,
    BasicFigureComponent,
    UploadModalComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
