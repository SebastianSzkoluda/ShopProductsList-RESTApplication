import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import {FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user-manager/user.service';
import {CommonModule} from '@angular/common';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HomePageComponent } from './home-page/home-page.component';
import {LoginActivate} from './login/LoginActivate';
import {TokenStorage} from './token/token.storage';
import {Interceptor} from './token/interceptor';
import { RegisterComponent } from './register/register.component';
import { UserManualComponent } from './user-manual/user-manual.component';
import { FamilyComponent } from './family/family.component';
import {FamilyService} from './services/family-manager/family.service';
import { ProductListComponent } from './product-list/product-list.component';
import {ProductService} from './services/product-manager/product.service';
import { CreateProductComponent } from './create-product/create-product.component';
registerLocaleData(en);

const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }, {
    path: 'user',
    component: UserComponent,
    canActivate: [LoginActivate]
  }, {
    path: 'productsList',
    component: ProductListComponent,
    canActivate: [LoginActivate]
  }, {
    path: 'usermanual',
    component: UserManualComponent
  }, {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HomePageComponent,
    RegisterComponent,
    UserManualComponent,
    FamilyComponent,
    ProductListComponent,
    CreateProductComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    /** import ng-zorro-antd root module，you should import NgZorroAntdModule instead in sub module **/
  ],
  exports: [
    RouterModule,
    CommonModule,
  ],
  providers: [UserService, { provide: NZ_I18N, useValue: en_US }, LoginActivate, TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    FormBuilder,
    FamilyService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

