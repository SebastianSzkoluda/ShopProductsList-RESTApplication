import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatPaginatorModule, MatSortModule
} from '@angular/material';
import { UserService } from './services/user-manager/user.service';
import { CdkTableModule } from '@angular/cdk/table';
import {CommonModule} from '@angular/common';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HomePageComponent } from './home-page/home-page.component';
import {LoginActivate} from './login/LoginActivate';
registerLocaleData(en);

const appRoutes: Routes = [
   {
    path: 'user',
    component: UserComponent,
    canActivate: [LoginActivate]
  }, {
    path: 'home',
    component: HomePageComponent
  }, {
    path: '',
    component: HomePageComponent
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HomePageComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CdkTableModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    FormsModule,
    /** import ng-zorro-antd root module，you should import NgZorroAntdModule instead in sub module **/
    NgZorroAntdModule
  ],
  exports: [RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CdkTableModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    FormsModule,
  ],
  providers: [UserService, { provide: NZ_I18N, useValue: en_US }, LoginActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
