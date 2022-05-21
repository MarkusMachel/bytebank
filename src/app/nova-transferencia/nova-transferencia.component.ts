import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Transferencia } from '../models/transferencia.model';
import { TransferenciaService } from '../services/transferencia.service';

@Component({
  selector: 'app-nova-transferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.component.scss'],
})
export class NovaTransferenciaComponent implements OnInit {
  valor: number;
  destino: number;

  @Output() aoTransferir = new EventEmitter<any>();

  constructor(private service: TransferenciaService, private router: Router) {}

  ngOnInit(): void {}

  transferir() {
    console.log('Solicitada nova transferência!');
    const valorEmitir: Transferencia = { valor: this.valor, destino: this.destino} 
    this.service.adicionar(valorEmitir).subscribe({
      next: resultado => {
        this.limparCampos();
        this.router.navigateByUrl('extrato');
      },
      error: error => console.error(error)
    })
  }

  limparCampos() {
    this.valor = 0;
    this.destino = 0;
  }
}
