export interface IDeputadoDetails {
  nomeCivil: string;
  dataNascimento: string;
  ultimoStatus: {
    siglaUf: string,
    situacao: string,
  }
}

export class DeputadoDetails {
  public nomeCivil: string;
  public dataNascimento: string;

  public siglaUf : string;
  public situacao: string;

  constructor(data: IDeputadoDetails) {
    this.nomeCivil = data.nomeCivil;
    this.dataNascimento = data.dataNascimento;
    this.siglaUf = data.ultimoStatus.siglaUf;
    this.situacao = data.ultimoStatus.situacao;
  }

}