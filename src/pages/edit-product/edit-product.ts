import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProductProvider, Product } from '../../providers/product/product';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html'
})



export class EditProductPage {

  //mascaras
  cpf_cnpj = '';
  DECIMAL_SEPARATOR=".";
  GROUP_SEPARATOR=",";
  pureResult: any;
  maskedId: any;
  val: any;
  v: any;



  cursos_processos: any[] = [];
  model: Product;
  categories: any[];
  codigo_consultor: string;


  public selectedCidade = 0;
  public selectedCurso = 0;


  cities = [];
  cidades = [];
  cursos = [];
  cursos_form = [];

  public editForm: any;
  messageNome = "";
  messageCpf = "";
  messageEmail = "";
  messagePassword = "";
  messageCelular = "";
  messageCidade = "";
  messageCurso = "";
  messageCodigo_consultor = "";
  messageAcao_comercial = "";
  messageProcesso_seletivo = "";
  errorNome = false;
  errorCpf = false;
  errorEmail = false;
  errorCelular = false;
  errorCidade = false;
  errorCurso = false;
  errorCodigo_consultor = false;
  errorAcao_comercial = false;
  errorProcesso_seletivo = false;



  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private productProvider: ProductProvider,
    public storage: Storage,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,) {

    this.model = new Product();

    this.productProvider.pegar_cidade()
      .then((result: any[]) => {
        this.cidades = result;
      })


    this.productProvider.pegar_cidade_curso()
      .then((result: any[]) => {
        this.cursos = result;
      })


    if (this.navParams.data.id) {
      this.productProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }

    this.editForm = formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      celular: ['', Validators.required],
      cidade: ['', Validators.required],
      curso: ['', Validators.required],
      codigo_consultor: ['', Validators.required],
      acao_comercial: ['', Validators.required],
      processo_seletivo: ['', Validators.required]
    });




  }

  /**
   * Runs when the page has loaded
   */
  ionViewDidLoad() {
    this.productProvider.pegar_processo_seletivo()
      .then((result: any[]) => {
        this.categories = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as categorias.', duration: 3000, position: 'botton' }).present();
      });

    this.storage.get('codigo')
      .then((codigo) => {
        this.codigo_consultor = codigo;
      });



  }

  save() {

    let { nome, cpf, email, celular, cidade, curso, codigo_consultor, acao_comercial, processo_seletivo } = this.editForm.controls;

    if (!this.editForm.valid) {
      if (!nome.valid) {
        this.errorNome = true;
        this.messageNome = "Digite seu Nome!";
      } else {
        this.messageNome = "";
      }

      if (!cpf.valid) {
        this.errorCpf = true;
        this.messageCpf = "Digite seu CPF!";
      } else {
        this.messageCpf = "";
      }
      if (!email.valid) {
        this.errorEmail = true;
        this.messageEmail = "Digite seu Email!";
      } else {
        this.messageEmail = "";
      }
      if (!celular.valid) {
        this.errorCelular = true;
        this.messageCelular = "Digite seu Celular!";
      } else {
        this.messageCelular = "";
      }
      if (!cidade.valid) {
        this.errorCidade = true;
        this.messageCidade = "Selecione sua Cidade!";
      } else {
        this.messageCidade = "";
      }
      if (!curso.valid) {
        this.errorCurso = true;
        this.messageCurso = "Selecione seu Curso!";
      } else {
        this.messageCurso = "";
      }
      if (!codigo_consultor.valid) {
        this.errorCodigo_consultor = true;
        this.messageCodigo_consultor = "Digite seu Ação Comercial!";
      } else {
        this.messageCodigo_consultor = "";
      }
      if (!acao_comercial.valid) {
        this.errorAcao_comercial = true;
        this.messageAcao_comercial = "Digite seu Ação Comercial!";
      } else {
        this.messageAcao_comercial = "";
      }
      if (!processo_seletivo.valid) {
        this.errorProcesso_seletivo = true;
        this.messageProcesso_seletivo = "Selecione o Processo Seletivo!";
      } else {
        this.messageProcesso_seletivo = "";
      }
    } else {
      this.saveProduct()
        .then(() => {
          this.toast.create({ message: 'Leed salvo.', duration: 3000, position: 'botton' }).present();
          this.navCtrl.pop();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao salvar o Leed.', duration: 3000, position: 'botton' }).present();
        });
    }
  }

  private saveProduct() {
    if (this.model.id) {
      return this.productProvider.update(this.model);
    } else {
      return this.productProvider.insert(this.model);
    }
  }




/** 
*Construção do combo cidade e curso 
* 
*/

/*onSelectCidade(cidade_id: number) {
  this.selectedCidade = cidade_id;
  this.selectedCurso = 0;
  this.cities = [];
  this.cursos = this.getCursos().filter((item) => {
    return item.id_cidade === Number(cidade_id)
  });
}*/

onSelectCidade(cidade_id: number) {
  this.selectedCidade = cidade_id;
  this.selectedCurso = 0;
  this.cities = [];
  this.cursos_form = this.getCursos().filter((item) => {
    return item.id_cidade === Number(cidade_id)
  });
  let cidade_retorno = this.cidades.filter((item) => {
    return item.id === Number(cidade_id);
  })
  for (let c of cidade_retorno) {
    this.model.cidade_nome = c.nome;
  }
}




onSelectCurso(curso_id: number) {
  this.selectedCurso = curso_id;

  let curso_retorno = this.cursos.filter((item) => {
    return item.id === Number(curso_id);
  })
  for (let c of curso_retorno) {
    this.model.curso_de_interesse = c.cursos;
  }


}

getCidades() {
  return this.cidades;
}

getCursos() {
  return this.cursos;
}


format(valString) {
  if (!valString) {
      return '';
  }
  let val = valString.toString();
  const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
  this.pureResult = parts;
  if(parts[0].length <= 11){
    this.maskedId = this.cpf_mask(parts[0]);
    if(this.valida_cpf(valString)){
      return this.maskedId;
    }else{
      let toast = this.toastCtrl.create({
        message: "CPF inválido!",
        duration: 3000
      });
      toast.present();
      return "";
    }
    
  }else{
    this.maskedId = this.cnpj(parts[0]);
    return this.maskedId;
  }
};

unFormat(val) {
  if (!val) {
      return '';
  }
  val = val.replace(/\D/g, '');

  if (this.GROUP_SEPARATOR === ',') {
      return val.replace(/,/g, '');
  } else {
      return val.replace(/\./g, '');
  }
};

cpf_mask(v) {
  v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
  //de novo (para o segundo bloco de números)
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
  return v;
}

cnpj(v) {
  v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
  v = v.replace(/^(\d{2})(\d)/, '$1.$2'); //Coloca ponto entre o segundo e o terceiro dígitos
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); //Coloca ponto entre o quinto e o sexto dígitos
  v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); //Coloca uma barra entre o oitavo e o nono dígitos
  v = v.replace(/(\d{4})(\d)/, '$1-$2'); //Coloca um hífen depois do bloco de quatro dígitos
  return v;
}

tel(telefone:string): string{
    if (! telefone) {
        return '';
    }

    let numero = telefone.replace(/\D/g, '');

    if (numero.length == 0) {
        return this.maskedId ='';
    } else if (numero.length >= 11) {
        this.maskedId = '('+ numero.substr(0,2) +') ' + numero.substr(2,5) + '-'+ numero.substr(7,4);
        console.log(this.maskedId);
        return this.maskedId;
    }

    return this.maskedId = '('+ numero.substr(0,2) +') ' + numero.substr(2,4) + '-'+ numero.substr(6,4);
}







valida_cpf(cpf: string): boolean {
  if (cpf == null) {
      return false;
  }
  if (cpf.length != 11) {
      return false;
  }
  if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
      return false;
  }
  let numero: number = 0;
  let caracter: string = '';
  let numeros: string = '0123456789';
  let j: number = 10;
  let somatorio: number = 0;
  let resto: number = 0;
  let digito1: number = 0;
  let digito2: number = 0;
  let cpfAux: string = '';
  cpfAux = cpf.substring(0, 9);
  for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
          return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
  }
  resto = somatorio % 11;
  digito1 = 11 - resto;
  if (digito1 > 9) {
      digito1 = 0;
  }
  j = 11;
  somatorio = 0;
  cpfAux = cpfAux + digito1;
  for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
  }
  resto = somatorio % 11;
  digito2 = 11 - resto;
  if (digito2 > 9) {
      digito2 = 0;
  }
  cpfAux = cpfAux + digito2;
  if (cpf != cpfAux) {
      return false;
  }
  else {
      return true;
  }
}


}