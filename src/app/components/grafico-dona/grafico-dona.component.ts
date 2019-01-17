import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() graficos: any;

  public leyenda: string;
  public chartLabels: string[] = [];
  public chartData: number[] = [];
  public chartType: string = 'doughnut';

  public chartColors:Array<any> = [];

  constructor() { }

  ngOnInit() {
    console.log( this.graficos );

    this.leyenda = this.graficos.leyenda;
    this.chartLabels = this.graficos.labels;
    this.chartData = this.graficos.data;
    this.chartType = this.graficos.type;
    this.chartColors = this.graficos.colors;
  }

}
