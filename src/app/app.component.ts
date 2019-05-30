import { NetworkProvider } from './../providers/network/network';
import { Network } from '@ionic-native/network';
import { HomePage } from './../pages/home/home';

import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from './../pages/login/login';
import { DatabaseProvider } from '../providers/database/database';
import { Storage } from '@ionic/storage';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;


  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    dbProvider: DatabaseProvider,
    public network: Network,
    private storage: Storage,
    public events: Events,
    public networkProvider: NetworkProvider

  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();


      //Criando o banco de dados
      dbProvider.createDatabase()
        .then(() => {
          // fechando a SplashScreen somente quando o banco for criado
          this.openHomePage(splashScreen);
        })
        .catch(() => {
          // ou se houver erro na criação do banco
          this.openHomePage(splashScreen);
        });


      this.networkProvider.initializeNetworkEvents();

      // Offline event
      this.events.subscribe('network:offline', () => {
        alert('network:offline ==> ' + this.network.type);
      });

      // Online event
      this.events.subscribe('network:online', () => {
        alert('network:online ==> ' + this.network.type);
      });






    });
  }

  private openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.storage.get('codigo')
      .then((user) => {
        if (user) {
          this.rootPage = HomePage;
          console.log("Estou logado");
        } else {
          this.rootPage = LoginPage;
          console.log("Estou não estou logado");
        }
      });
  }


}