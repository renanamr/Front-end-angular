import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Deputado } from '../models/deputado';
import { catchError, map, tap } from 'rxjs/operators';
import { DeputadoDetails } from '../models/deputado_details';

@Injectable({
  providedIn: 'root',
})
export class DeputadoService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'https://dadosabertos.camara.leg.br/api/v2';

  private deputados: Deputado[] | null = null;


  getDeputados(): Observable<Deputado[]> {
    if (this.deputados == null) {
      return this.fetchDeputados().pipe(
        tap(data => { this.deputados = data }),
      );
    }

    return of(this.deputados);
  }

  getDeputadoById(id: number): Observable<Deputado> {
    let deputado = this.deputados!.find((deputado) => deputado.id === id);

    // Se o deputado não foi encontrado, retorna um erro
    if (!deputado) {
      return throwError(() => new Error('Deputado não encontrado'));
    }

    // Se os detalhes já existem, retorna o deputado como um Observable
    if (deputado.details) {
      return of(deputado);
    }

    return this.getDeputadoDetalhes(id).pipe(
      map((detalhes) => {
        deputado.details = detalhes;
        return deputado;
      })
    );
  }


  // Muda o status do "Seguir" do deputado
  onChangeSeguir(deputado: Deputado): void {
    deputado.seguido = !deputado.seguido;

    let deputadoLocal = this.deputados!.find((other) => other.id === deputado.id);
    deputadoLocal!.seguido = deputado.seguido;
  }


  // USECASE: Requisição para buscar a lista de deputados
  private fetchDeputados(): Observable<Deputado[]> {
    const headers = new HttpHeaders({
      Accept: 'application/json', // Especifica o retorno JSON
    });

    return this.http
      .get<any>(
        `${this.apiBaseUrl}/deputados`,
        {
          headers,
          params: {
            itens: '12',
            ordem: 'ASC',
            ordenarPor: 'nome',
          },
        },
      )
      .pipe(
        catchError((error) => {
          return of({ error: true, message: 'Erro ao carregar a lista de deputados.' });
        }),
        map((response) => Deputado.fromList(response.dados),
        ));
  }

  // USECASE: Requisição para buscar os detalhes de um deputado
  private getDeputadoDetalhes(id: number): Observable<DeputadoDetails> {
    const headers = new HttpHeaders({
      Accept: 'application/json', // Especifica o retorno JSON
    });

    return this.http.get<any>(`${this.apiBaseUrl}/deputados/${id}`, { headers }).pipe(
      catchError((error) => {
        return of({ error: true, message: 'Erro ao carregar os detalhes do deputado.' });
      }),
      map((response) => new DeputadoDetails(response.dados)),
    );
  }

}