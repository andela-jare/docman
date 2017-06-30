import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Other dependencies
import { LoadersCssModule } from 'angular2-loaders-css';
// route
import { AppRoutingModule } from './routing.module';
// services
import { AuthService } from './services/auth.service';
import { DocumentService } from './services/document.service';
import { HttpService } from './services/http.service';
import { UserService } from './services/user.service';

// component
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateDocumentComponent } from './pages/documents/create-document.component';
import { EditDocumentComponent } from './pages/edit-document/edit-document.component';
import { DocumentDetailsComponent } from './pages/document-details/document-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PopupComponent } from './components/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    CreateDocumentComponent,
    EditDocumentComponent,
    DocumentDetailsComponent,
    PopupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    LoadersCssModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HttpService,
      useFactory: HttpService.useFactory,
      deps: [ XHRBackend, RequestOptions ]
    },
    AuthService,
    DocumentService,
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
