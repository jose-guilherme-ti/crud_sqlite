
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class ProductProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(product: Product) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into products (nome, cpf, email, celular, cidade, cidade_nome, curso_de_interesse, codigo_consultor, acao_comercial,enviados, processo_seletivo) values (?, ?, ?, ?, ?, ?, ?, ?,?,?,?)';
        let data = [product.nome, product.cpf, product.email, product.celular, product.cidade, product.cidade_nome, product.curso_de_interesse, product.codigo_consultor, product.acao_comercial, 0, product.processo_seletivo];

        return db.executeSql(sql, data)
          .catch((e) => console.log(e));
      })
      .catch((e) => console.error(e));
  }

  public insert_cursos(curso: Cursos) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        let sql = 'insert into cursos_processo_seletivos (id_concurso, concurso, curso, unidade, turno, identificador_do_curso) values (?, ?, ?, ?, ?, ?)';
        let data = [curso.id_concurso, curso.concurso, curso.curso, curso.unidade, curso.turno, curso.identificador_do_curso];

        return db.executeSql(sql, data)

          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public insert_curso_cidade(curso_cidade: Curso_Cidade) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        let sql = 'insert into cursos (id, cursos,id_cidade) values (?, ?, ?)';
        let data = [curso_cidade.id, curso_cidade.cursos, curso_cidade.id_cidade];

        return db.executeSql(sql, data)

          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }





  public insert_base_consultor(consultor: Consultor) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {

        let sql = 'insert into acesso_consultor (id, codigo, unidade, email, nome, senha, id_codigo) values (?, ?, ?, ?, ?, ?, ?)';
        let data = [consultor.id, consultor.codigo, consultor.unidade, consultor.email, consultor.nome, consultor.senha, consultor.id_codigo];

        return db.executeSql(sql, data)

          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }



  public insert_cidade(cidade: Cidade) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into cidade (id, nome) values (?, ?)';
        let data = [cidade.id, cidade.nome_cidade];
        return db.executeSql(sql, data)

          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public insert_proceso_seletivo(seletivo: Processo_seletivos_app) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into categories (id, nome, concurso_texto) values (?, ?, ?)';
        let data = [seletivo.id, seletivo.nome, seletivo.concurso_texto];
        return db.executeSql(sql, data)

          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public pegar_todos_cursos() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM cursos_processo_seletivos';
        var data: any[] = [];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let cursos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var curso = data.rows.item(i);
                cursos.push(curso);
              }

              return cursos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public pegar_consultor(codigo: string, senha: any) {
    console.log('Estou dentro do products pegar consultor');
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        console.log('Estou depois do SQLiteObject products pegar consultor');
        let sql = 'SELECT * FROM acesso_consultor WHERE codigo = ? and senha = ?';
        let data = [codigo, senha];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let cursos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var curso = data.rows.item(i);
                cursos.push(curso);
              }
              console.log('Estou saindo do products pegar consultor');
              return cursos;
            } else {
              return null;
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }





  public pegar_cidade() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM cidade';
        var data = [];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let cursos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var curso = data.rows.item(i);
                cursos.push(curso);
              }
              return cursos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public pegar_cidade_curso() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM cursos';
        var data = [];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let cursos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var curso = data.rows.item(i);
                cursos.push(curso);
              }
              return cursos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public pegar_processo_seletivo() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM categories';
        var data = [];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let cursos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var curso = data.rows.item(i);
                cursos.push(curso);
              }
              return cursos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }



  public update(product: Product) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update products set nome = ?, cpf = ?, email = ?, celular = ?, cidade = ?, curso_de_interesse = ?, codigo_consultor = ?,  acao_comercial = ?, processo_seletivo = ? where id = ?';
        let data = [product.nome, product.cpf, product.email, product.celular, product.cidade, product.curso_de_interesse, product.codigo_consultor, product.acao_comercial, product.processo_seletivo, product.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update_enviar(id: Number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update products set enviados = ? where id = ?';
        let data = [1, id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }



  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from products where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public atualizar_remover() {
   return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        console.log('Atualizando bases, removendo antiga.')
        let sql1 = 'delete from cidade';
        let data1 = [];
        let sql2 = 'delete from cursos';
        let data2 = [];
        let sql3 = 'delete from acesso_consultor';
        let data3 = [];
        let sql4 = 'delete from categories';
        let data4 = [];
        db.executeSql(sql1, data1)
        db.executeSql(sql2, data2)
        db.executeSql(sql3, data3)
        db.executeSql(sql4, data4)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from products where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let product = new Product();
              product.id = item.id;
              product.nome = item.nome;
              product.cpf = item.cpf;
              product.email = item.email;
              product.celular = item.celular;
              product.cidade = item.cidade;
              product.curso_de_interesse = item.curso_de_interesse;
              product.codigo_consultor = item.codigo_consultor;
              product.acao_comercial = item.acao_comercial;
              product.processo_seletivo = item.processo_seletivo;

              return product;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(codigo_consultor: string, name: string = null, enviar: boolean = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT p.* FROM products p WHERE p.enviados = ? and p.codigo_consultor = ?';
        var data: any[] = [enviar ? 1 : 0];
        data.push(codigo_consultor);
        // filtrando pelo nome
        if (name) {
          sql += ' and p.nome like ?'
          data.push('%' + name + '%');
        }



        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let products: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var product = data.rows.item(i);
                products.push(product);
              }
              return products;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Product {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  celular: string;
  cidade: string;
  cidade_nome: string;
  curso_de_interesse: string;
  codigo_consultor: string;
  acao_comercial: string;
  processo_seletivo: string;
  enviados: boolean;
}

export class Cursos {
  id_concurso: number;
  concurso: string;
  curso: string;
  unidade: string;
  turno: string;
  identificador_do_curso: string;
}

export class Consultor {
  id: number;
  codigo: string;
  unidade: string;
  email: string;
  nome: string;
  senha: string;
  id_codigo: string;
}


export class Cidade {
  id: number;
  nome_cidade: string;
}

export class Curso_Cidade {
  id: number;
  cursos: string;
  id_cidade: number;
}

export class Processo_seletivos_app {
  id: number;
  nome: string;
  concurso_texto: string;
}
