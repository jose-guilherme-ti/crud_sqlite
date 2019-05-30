

import { HomePage } from './../home/home';
import { Storage } from '@ionic/storage';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Platform } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { ProductProvider } from '../../providers/product/product';
import { Network } from '@ionic-native/network';
import { FormBuilder, Validators } from '@angular/forms';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var navigator: any;
declare var Connection: any;



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  cursos_processos: any[] = [];
  consultor: any[] = [];
  cidade: any[] = [];
  public credential: object = {
    codigo: "",
    password: ""
  }

  public loginForm: any;
  messageCodigo = "";
  messagePassword = "";
  errorCodigo = false;
  errorPassword = false;
  status :any;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthProvider,
    public storage: Storage,
    public http: HttpServiceProvider,
    private productProvider: ProductProvider,
    public loadingController: LoadingController,
    public network: Network,
    public toastCtrl: ToastController,
    public platform: Platform,
    public formBuilder: FormBuilder
  ) {

    this.loginForm = formBuilder.group({
      codigo: ['', Validators.required],
      password: ['', Validators.required]
    });

  }







  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


  }


  atualizar() {
    this.platform.ready().then(() => {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';
      console.log(states[networkState]);

      if (states[networkState] != 'No network connection') {

        let load = this.loadingController.create({
          content: "Carregando dados dos consultores FTC..."
        });

        load.present();

        this.productProvider.atualizar_remover();


        this.http.pegar('customers/carregar_base_consultor')
          .subscribe(data => {
            load.dismiss();
            for (let d of data) {
              this.productProvider.insert_base_consultor(d);

            }
          });

        this.http.pegar('customers/cidade')
          .subscribe(data => {
            for (let d of data) {
              this.productProvider.insert_cidade(d);
            }
          });
        this.http.pegar('customers/cursos_cidade')
          .subscribe(data => {
            for (let d of data) {
              this.productProvider.insert_curso_cidade(d);
            }
          });
        this.http.pegar('customers/processo_seletivo')
          .subscribe(data => {
            for (let d of data) {
              this.productProvider.insert_proceso_seletivo(d);
            }
          });

      } else {
        let toast = this.toastCtrl.create({
          message: "Por favor conecte a internet para atualizar o sistema!!",
          duration: 3000
        });
        toast.present();
      }

    });




  }

  login() {
    let { codigo, password } = this.loginForm.controls;
    console.log(this.loginForm.controls);
    if (!this.loginForm.valid) {
      if (!codigo.valid) {
        this.errorCodigo = true;
        this.messageCodigo = "Digite seu codigo!";
      } else {
        this.messageCodigo = "";
      }

      if (!password.valid) {
        this.errorPassword = true;
        this.messagePassword = "Digite sua senha!";
      } else {
        this.messagePassword = "";
      }
    }
    else {
      console.log('login digitado corretamente');
      this.authService.login(this.credential).then((result)=>{
          this.navCtrl.push(HomePage);
      }).catch(() =>{
        let toast = this.toastCtrl.create({
          message: "Login ou senha estão incorretos.",
          duration: 3000
        });
        toast.present();
      })
      
        /*if (data) {
          this.navCtrl.push(HomePage);
        }*/
      
      /*return new Promise((resolve, reject) => {
        this.storage.get('codigo')
          .then((answer) => {
            console.log('Antes do answer', answer);
            resolve(answer);
            console.log('Depois do answer', answer);
            if (answer) {
              this.navCtrl.push(HomePage);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });*/

    }

  }

}
