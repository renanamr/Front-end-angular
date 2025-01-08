import { DeputadoDetails } from "./deputado_details";

export interface IDeputado {
  id: number;
  nome: string;
  siglaPartido: string;
  urlFoto: string;
  seguido?: boolean; // Campo opcional
}

export class Deputado {
  public id: number;
  public nome: string;
  public siglaPartido: string;
  public urlFoto: string;
  public seguido: boolean;

  public details! : DeputadoDetails | null;

  constructor(data: IDeputado) {
    this.id = data.id;
    this.nome = data.nome;
    this.siglaPartido = data.siglaPartido;
    this.urlFoto = data.urlFoto;
    this.seguido = data.seguido ?? false;
  }

  // Método para criar uma lista de Deputados a partir de uma lista de objetos JSON
  static fromList(jsonArray: IDeputado[]): Deputado[] {
    return jsonArray.map(item => new Deputado(item));
  }
}