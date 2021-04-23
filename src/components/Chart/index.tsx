import { ChartData } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { generateColor, randomNumber } from '../../services/utils';
import options from './options';
import "./styles.css";

const Chart = () => {

    const labels = ['Red', 'Blue',]

    const datasets = [
        {
            label: '# of Votes 1',
            data: [
                randomNumber(),
                randomNumber(),
            ],

        },
        {
            label: '# of Votes 2',
            data: [
                randomNumber(),
                randomNumber(),
            ],
        }
    ]

    const datasetsSerialized = datasets.map(dataset => {
        const color = generateColor();
        return {
            ...dataset,
            pointBackgroundColor: color.rgb,
            backgroundColor: color.rgb,
            borderColor: color.rgb,
            borderWidth: 1,
        }
    })

    const dataCharts: ChartData = {
        labels,
        datasets: datasetsSerialized
    };

    return (
        <Line
            id="graph-chart"
            data={dataCharts}
            type="line"
            className="chart"
            options={options}
        />
    )
}


export default Chart;