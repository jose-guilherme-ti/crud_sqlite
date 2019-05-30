import { LoginPage } from './../pages/login/login';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SQLite } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../providers/database/database';
import { ProductProvider } from '../providers/product/product';
import { CategoryProvider } from '../providers/category/category';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { AuthProvider } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from  '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';
import {NgxMaskModule} from 'ngx-mask';

registerLocaleData(localePt, 'pt-BR');


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    NgxMaskModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // Grande sacada para formatar numeros e datas no formato brasileiro
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    ProductProvider,
    CategoryProvider,
    DatabaseProvider,
    ProductProvider,
    CategoryProvider,
    HttpServiceProvider,
    AuthProvider,
    Network,
    NetworkProvider
  ]
})
export class AppModule {}