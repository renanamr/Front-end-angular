import { Component, OnInit } from '@angular/core';
import { Deputado } from '../../models/deputado';
import { DeputadoService } from '../../services/deputado.service';
import { DeputadoCardComponent } from "./components/deputado-card/deputado-card.component";
import { catchError, of } from 'rxjs';
import { AlertErrorComponent } from "../../components/alert-error/alert-error.component";
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: 'app-deputados-list',
  standalone: true,
  imports: [DeputadoCardComponent, AlertErrorComponent, LoadingComponent],
  templateUrl: './deputados-list.component.html',
  styleUrl: './deputados-list.component.scss'
})
export class DeputadosListComponent implements OnInit {

  hasError: boolean = false;
  isLoading: boolean = true;
  deputados: Deputado[] | null = null;

  constructor(private deputadoService: DeputadoService) { }

  ngOnInit(): void {
    this.deputadoService.getDeputados()
      .pipe(
        catchError((error) => {
          this.hasError = true;
          return of(null);
        }),
      )
      .subscribe((deputados) => {
        this.deputados = deputados;
        this.isLoading = false;
      });
  }

  onChangeSeguir(deputado: Deputado): void {
    this.deputadoService.onChangeSeguir(deputado);
  }
}