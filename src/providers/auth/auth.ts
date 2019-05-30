
import { HttpServiceProvider } from './../http-service/http-service';
import { ToastController } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProductProvider } from '../../providers/product/product'
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private msg: string = "É preciso logar para acessar!";
  consultor: any[] = [];

  constructor(
    public http: HttpServiceProvider,
    public storage: Storage,
    public toastCtrl: ToastController,
    private productProvider: ProductProvider
  ) {
    console.log('Hello AuthProvider Provider');
  }



  public login(credentials) {
    var data: any = false;
   
    this.productProvider.pegar_consultor(credentials.codigo,  Md5.hashStr(credentials.password))
      .then((result: any[]) => {
        this.consultor = result;
        if (this.consultor != null) {
          for (let c of this.consultor) {
            this.storage.set('codigo', c.codigo);
            this.storage.set('nome', c.nome);
          }
          return data = true;
        } else {
          let toast = this.toastCtrl.create({
            message: "Login ou senha estão incorretos.",
            duration: 3000
          });
          toast.present();
        }

      })
      return data;
  }


  userIdLogged() {
    return this.storage.get('codigo').then(val => {
      if (val) {
        return val;
      } else {
        let toast = this.toastCtrl.create({
          message: this.msg,
          duration: 3000
        });
        toast.present();
        return false;
      }
    })
  }

  logout() {
    this.storage.remove('codigo');
    this.storage.remove('nome');
  }

}
