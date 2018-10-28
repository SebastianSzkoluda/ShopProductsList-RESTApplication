import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {UserComponent} from './user/user-login/user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth/auth-manager/auth.service';
import {CommonModule, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {HomePageComponent} from './page-content/home-page/home-page.component';
import {LoginActivate} from './auth/login/LoginActivate';
import {TokenStorage} from './auth/token/token.storage';
import {Interceptor} from './auth/token/interceptor';
import {RegisterComponent} from './auth/register/register.component';
import {UserManualComponent} from './user/user-manual/user-manual.component';
import {FamilyComponent} from './family/create-family/family.component';
import {FamilyService} from './family/family-manager/family.service';
import {ProductListComponent} from './products/product-list/product-list.component';
import {ProductService} from './products/product-manager/product.service';
import {CreateProductComponent} from './products/create-product/create-product.component';
import {HeaderComponent} from './page-content/header/header.component';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {NotificationEffects} from './store/effects/notification-effects';
import {reducers} from './store/reducers';
import {EditProductComponent} from './products/edit-product/edit-product.component';
import {NotificationComponent} from './page-content/notification/notification.component';
import {UserInviteComponent} from './user/user-invite/user-invite.component';
import {NotificationService} from './page-content/notification/notification-manager/notification.service';
import {AuthEffects} from './store/effects/auth-effects';
import { ShopMapComponent } from './shop-map/shop-map.component';
import {SafePipe} from './shop-map/safe-pipe';
import {WebSocketService} from './websocket/web-socket.service';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import {FamilyEffects} from './store/effects/family-effects';
import {ProductEffects} from './store/effects/product-effects';
import {UploadFileService} from './upload-files/upload-file.service';
import {SecurePipe} from './user/user-profile/secure-pipe';

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
    path: 'userprofile',
    component: UserProfileComponent,
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
    HeaderComponent,
    EditProductComponent,
    NotificationComponent,
    UserInviteComponent,
    ShopMapComponent,
    SafePipe,
    SecurePipe,
    UserProfileComponent
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
    EffectsModule.forRoot([NotificationEffects, AuthEffects, FamilyEffects, ProductEffects]),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 5,
    })
    /** import ng-zorro-antd root module，you should import NgZorroAntdModule instead in sub module **/
  ],
  exports: [
    RouterModule,
    CommonModule,
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    LoginActivate,
    TokenStorage,
    FormBuilder,
    FamilyService,
    AuthService,
    ProductService,
    NotificationService,
    WebSocketService,
    UploadFileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

