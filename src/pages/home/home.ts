import { LoginPage } from './../login/login';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Platform } from 'ionic-angular';
import { ProductProvider, Product } from '../../providers/product/product'
import { AuthProvider } from './../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';


declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products: any[] = [];
  //consultor: Array<{}>;
  consultor: any[] = [];

  nome_consultor: string;
  onlyInactives: boolean = false;
  searchText: string = null;
  codigo_consultor: string;

  conectado: boolean;


  constructor(
    public navCtrl: NavController,
    private toast: ToastController,
    public http: HttpServiceProvider,
    public toastCtrl: ToastController,
    public authService: AuthProvider,
    public storage: Storage,
    private productProvider: ProductProvider,
    public loadingController: LoadingController,
    public network: Network,
    public platform: Platform) {

  }


  apresentar_mensagem(conexao: boolean) {
    let msg;
    if (conexao) {
      msg = "Você está conectado a internet";
    } else {
      msg = "Você não está conectado a internet";
    }
    this.toast.create({
      message: msg,
      duration: 3000
    }).present();
  }




  ionViewDidEnter() {
    this.storage.get('codigo')
      .then((result) => {
        this.codigo_consultor = result;
        this.getAllProducts(this.codigo_consultor);
      })
  }

  getFromStorageAsync() {
    return this.storage.get('codigo');
  }

  enviar() {
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

        this.productProvider.getAll(this.codigo_consultor, this.searchText, false)
          .then((result: any[]) => {
            this.consultor = result;

            //Carrega load
            let load = this.loadingController.create({
              content: "Enviando dados para seu Dash..."
            });
            load.present();
            //
            //Envia todos com contatos que estão com status enviados como 0,
            // para banco de dados via api REST
            this.http.save('customers/enviar', this.consultor)
              .subscribe(data => {

                load.dismiss();
                let toast = this.toastCtrl.create({
                  message: data.msg,
                  duration: 3000
                });
                toast.present();
              });

            //Atualiza todos os contatos enviados para 1
            for (let ativo of this.consultor) {
              console.log(ativo.id);
              this.productProvider.update_enviar(ativo.id);
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

  getAllProducts(codigo: string = null) {
    this.storage.get('codigo')
      .then((result) => {
        this.codigo_consultor = result;
        this.productProvider.getAll(this.codigo_consultor, this.searchText, this.onlyInactives)
          .then((result: any[]) => {
            this.products = result;
            this.storage.get('nome')
              .then((user) => {
                this.nome_consultor = user;
              });
          });
      })


  }

  addProduct() {
    this.navCtrl.push('EditProductPage');
  }

  editProduct(id: number) {
    this.navCtrl.push('EditProductPage', { id: id });
  }

  removeProduct(product: Product) {
    this.productProvider.remove(product.id)
      .then(() => {
        // Removendo do array de produtos
        var index = this.products.indexOf(product);
        this.products.splice(index, 1);
        this.toast.create({ message: 'Produto removido.', duration: 3000, position: 'botton' }).present();
      })
  }

  filterProducts(ev: any) {
    this.getAllProducts();
  }
  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}