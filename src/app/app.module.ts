import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { Cloudinary } from '@cloudinary/angular-5.x/src/cloudinary.service';
import { ClickOutsideModule } from 'ng-click-outside';

import { FileSelectDirective } from 'ng2-file-upload';

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
import { UploadComponent } from './main/upload/upload.component';
import { PhotoViewerComponent } from './main/photo-viewer/photo-viewer.component';
import { UserComponent } from './main/user/user.component';
import { UserActionComponent } from './main/user/user-action/user-action.component';
import { SearchComponent } from './main/search/search.component';
import { SActionComponent } from './main/search/s-action/s-action.component';
import { SHeaderComponent } from './main/search/s-header/s-header.component';
import { FollowingComponent } from './main/home/following/following.component';
import { CollectionGridsComponent } from './main/home/collection-grids/collection-grids.component';
import { CollectionItemComponent } from './main/home/collection-grids/collection-item/collection-item.component';
import { UsergridsComponent } from './main/home/usergrids/usergrids.component';
import { UserItemComponent } from './main/home/usergrids/user-item/user-item.component';
import { CollectionsComponent } from './main/collections/collections.component';
import { CltViewComponent } from './main/collections/clt-view/clt-view.component';
import { CltCreateModalComponent } from './main/collections/clt-create-modal/clt-create-modal.component';
import { AccountComponent } from './main/account/account.component';
import { ModalComponent } from './common/modal/modal.component';
import { CollectionComponent } from './common/modal/collection/collection.component';

import cloudinaryConfiguration from './config';
import { LogoutComponent } from './main/logout/logout/logout.component';
import { NotfoundComponent } from './common/notfound/notfound/notfound.component';
import { InfoComponent } from './common/modal/info/info.component';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

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
    FooterComponent,
    UploadComponent,
    PhotoViewerComponent,
    UserComponent,
    UserActionComponent,
    SearchComponent,
    SActionComponent,
    SHeaderComponent,
    FollowingComponent,
    CollectionGridsComponent,
    CollectionItemComponent,
    UsergridsComponent,
    UserItemComponent,
    CollectionsComponent,
    CltViewComponent,
    CltCreateModalComponent,
    AccountComponent,
    ModalComponent,
    CollectionComponent,
    FileSelectDirective,
    LogoutComponent,
    NotfoundComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CloudinaryModule.forRoot(cloudinary, config),
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
