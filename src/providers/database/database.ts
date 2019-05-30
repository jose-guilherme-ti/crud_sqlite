import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
 
@Injectable()
export class DatabaseProvider {
 
  constructor(private sqlite: SQLite) { }
 
  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({
      name: 'products.db',
      location: 'default'
    });
  }
 
  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
 
        // Criando as tabelas
        this.createTables(db);
 
        // Inserindo dados padrão
        //this.insertDefaultItems(db);
 
      })
      .catch(e => console.log(e));
  }
 
  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas



    db.sqlBatch([
    //['DROP TABLE products'],
    //['DROP TABLE categories'],
       
     // ['DROP TABLE cursos_processo_seletivos'],
      //['DROP TABLE IF EXISTS acesso_consultor'],
     // ['DROP TABLE IF EXISTS cidade'],
     // ['DROP TABLE IF EXISTS cursos'],

      ['CREATE TABLE IF NOT EXISTS cidade (id integer primary key, nome TEXT) '],
      ['CREATE TABLE IF NOT EXISTS cursos (id integer primary key, cursos TEXT, id_cidade integer) '],
      ['CREATE TABLE IF NOT EXISTS acesso_consultor (id integer primary key AUTOINCREMENT NOT NULL, codigo TEXT, unidade TEXT, email TEXT, nome TEXT, senha TEXT, id_codigo TEXT) '],
      ['CREATE TABLE IF NOT EXISTS cursos_processo_seletivos (id integer primary key AUTOINCREMENT NOT NULL, id_concurso integer, concurso TEXT, curso TEXT, unidade TEXT, turno TEXT, identificador_do_curso TEXT) '],
      ['CREATE TABLE IF NOT EXISTS categories (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, concurso_texto TEXT)'],
      ['CREATE TABLE IF NOT EXISTS products (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, cpf VARCHAR(32), email VARCHAR(32), celular VARCHAR(32), cidade VARCHAR(32), cidade_nome VARCHAR(32), curso_de_interesse VARCHAR(32), codigo_consultor VARCHAR(32), acao_comercial VARCHAR(32), processo_seletivo TEXT, enviados integer)']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }
 

  /**
   * Incluindo os dados padrões
   */// @param db
   //*/
  /*private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from categories', [])
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
 
        // Criando as tabelas
        db.sqlBatch([
          ['insert into categories (name, codigo_concurso) values (?)', ['Vestibular Agendado','192']],
          ['insert into categories (name, codigo_concurso) values (?)', ['Seleção nota ENEM',]],
          ['insert into categories (name, codigo_concurso) values (?)', ['Vestibular Tradicional']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));
 
      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  }*/
}