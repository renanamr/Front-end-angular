import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DeputadoService } from '../../services/deputado.service';
import { Deputado } from '../../models/deputado';
import { AlertErrorComponent } from "../../components/alert-error/alert-error.component";
import { catchError, of } from 'rxjs';
import { LoadingComponent } from "../../components/loading/loading.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-deputado-details',
  standalone: true,
  imports: [RouterLink, AlertErrorComponent, LoadingComponent, DatePipe],
  templateUrl: './deputado-details.component.html'
})
export class DeputadoDetailsComponent implements OnInit {

  hasError: boolean = false;
  isLoading: boolean = true;
  deputado!: Deputado | undefined;

  constructor(
    private route: ActivatedRoute,
    private deputadoService: DeputadoService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.deputadoService.getDeputadoById(id).pipe(
      catchError((error) => {
        this.hasError = true;
        return of(undefined);
      }),
    )
      .subscribe((deputado) => {
        this.deputado = deputado;
        this.isLoading = false;
      });
  }

  onChangeSeguir(): void {
    if (this.deputado) {
      this.deputadoService.onChangeSeguir(this.deputado);
    }
  }
}