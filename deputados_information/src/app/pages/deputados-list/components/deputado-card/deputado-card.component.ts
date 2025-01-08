import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Deputado } from '../../../../models/deputado';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-deputado-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './deputado-card.component.html',
  styleUrl: './deputado-card.component.scss'
})
export class DeputadoCardComponent {
  @Input({required: true}) deputado! : Deputado;

  @Output() eventChageSeguir = new EventEmitter<Deputado>();

  onChangeSeguir() : void{
    this.eventChageSeguir.emit(this.deputado);
  }
}
