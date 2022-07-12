import { Component, Input, OnInit } from '@angular/core';
import { Bar, IBarChartOptions, IChartistBarChart, IChartistData, IChartistLineChart, ILineChartOptions, Interpolation, Line, plugins, Svg } from 'chartist';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

    @Input() public chartTitle: string;
    @Input() public chartType: 'bar' | 'line';
    @Input() public data: any[];
    @Input() public dataLabelKey: string;
    constructor() { }

    public ngOnInit(): void {
        this.initPreviewChart();
    }

    private initPreviewChart(): void {
        const sliceNumber = 5;
        const { data, options } = this.getDataChartSliced(sliceNumber, 0, '150px');
        const chartId = '#chartId';

        let chart;
        switch(this.chartType){
            case 'bar':
                chart = new Bar(chartId, data, options);
                break;
            case 'line':
                chart = new Line(chartId, data, options);
                break;
        }

        this.startAnimationForChart(chart);
    }

    private getDataChartSliced(sliceNumber: number, endDistance: number, chartHeight: string): { data: IChartistData; options: IBarChartOptions | ILineChartOptions; } {
        const labelValuePair = this.getSortedData();

        const endIndex = labelValuePair.length - endDistance;
        const startIndex = Math.max(endIndex - Math.min(sliceNumber, endIndex), 0);

        const values = Object.values(labelValuePair).slice(startIndex, endIndex);
        const labels = Object.keys(labelValuePair).slice(startIndex, endIndex);

        const dataChart: IChartistData = this.getChartistData(labels, values);
        let optionsChart;
        switch(this.chartType){
            case 'bar':
                optionsChart = this.getBarChartOptions(values, chartHeight);
                break;
            case 'line':
                optionsChart = this.getLineChartOptions(values, chartHeight);
                break;
        }
        return { data: dataChart, options: optionsChart };
    }

    //TODO, LOS DATOS HAY QUE PONERLOS EN DOS
    private getChartistData(labels: string[], values: number[]): IChartistData
    {
        return {
            labels: labels,
            series: [{ name: 'Tiempo de juego (s)', data: values }]
        };
    }

    private getSortedData(): any[] {
        return this.data.sort((a: any, b: any) => a.key < b.key ? 1 : 0);
    }

    private startAnimationForChart(chart: IChartistLineChart | IChartistBarChart): void {
        let seq: any;
        let delays: any;
        let durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', (data: any) => {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point' || data.type === 'bar') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    }

    private getLineChartOptions(values: any[], chartHeight: string): ILineChartOptions {
        return {
            lineSmooth: Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: Math.max(...Object.values(values)),
            height: chartHeight,
            axisY: {
                onlyInteger: true
            },
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
            plugins: [
                plugins.legend()
            ]
        };
    }

    private getBarChartOptions(values: any[], chartHeight: string): IBarChartOptions {
        return {
            axisX: {
                showGrid: false,
            },
            low: 0,
            height: chartHeight,
            axisY: {
                onlyInteger: true
            },
            high: Math.max(...Object.values(values)),
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
            plugins: [
                plugins.legend()
            ]
        };
    }

}
