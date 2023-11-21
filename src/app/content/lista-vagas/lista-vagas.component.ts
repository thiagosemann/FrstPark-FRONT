import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-vagas',
  templateUrl: './lista-vagas.component.html',
  styleUrls: ['./lista-vagas.component.css']
})
export class ListaVagasComponent {
  vagas = [
    {
      foto: 'caminho/para/foto1.jpg',
      descricao: 'Vaga 1',
      detalhes: 'Vaga ampla próxima à entrada principal.',
      valor: 50.00
    },
    {
      foto: 'caminho/para/foto2.jpg',
      descricao: 'Vaga 2',
      detalhes: 'Vaga coberta com vigilância 24 horas.',
      valor: 150.00
    },
    {
      foto: 'caminho/para/foto2.jpg',
      descricao: 'Vaga 3',
      detalhes: 'Vaga coberta com vigilância 24 horas.',
      valor: 200.00
    },
    {
      foto: 'caminho/para/foto2.jpg',
      descricao: 'Vaga 4',
      detalhes: 'Vaga coberta com vigilância 24 horas.',
      valor: 250.00
    },
    {
      foto: 'caminho/para/foto2.jpg',
      descricao: 'Vaga 5',
      detalhes: 'Vaga coberta com vigilância 24 horas.',
      valor: 300.00
    },
    {
      foto: 'caminho/para/foto2.jpg',
      descricao: 'Vaga 6',
      detalhes: 'Vaga coberta com vigilância 24 horas.',
      valor: 350.00
    },
    {
      foto: 'caminho/para/foto2.jpg',
      descricao: 'Vaga 7',
      detalhes: 'Vaga coberta com vigilância 24 horas.',
      valor: 400.00
    },
    {
      foto: 'caminho/para/foto2.jpg',
      descricao: 'Vaga 8',
      detalhes: 'Vaga coberta com vigilância 24 horas.',
      valor: 450.00
    },
    // Adicione mais dados conforme necessário
  ];
 
  filtroDataInicio!: string;
  filtroDataFim!: string;
  filtroPrecoMinimo!: number;
  filtroPrecoMaximo!: number;
  ordenacaoAsc = true; // Adicionado flag para controlar a ordenação ascendente/descendente

  filtrarVagas(): any[] {
    return this.vagas.filter(vaga => {
      const precoMinimoNaoVazio = this.filtroPrecoMinimo !== undefined && this.filtroPrecoMinimo !== null;
      const precoMaximoNaoVazio = this.filtroPrecoMaximo !== undefined && this.filtroPrecoMaximo !== null;

      // Filtro por preço apenas se os campos não estiverem vazios
      if (
        (precoMinimoNaoVazio && vaga.valor < this.filtroPrecoMinimo) ||
        (precoMaximoNaoVazio && vaga.valor > this.filtroPrecoMaximo)
      ) {
        return false;
      }

      return true;
    });
  }

  alternarOrdenacao() {
    this.ordenacaoAsc = !this.ordenacaoAsc;
  }
}
