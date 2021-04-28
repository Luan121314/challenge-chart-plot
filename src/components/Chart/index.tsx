import React from 'react';
import { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateColor } from '../../services/utils';
import options from './options';
import "./styles.css";

interface DatasetProps{
    data:Array<number>,
    label: string
}

interface ChartProps{
    labels:Array<string>,
    datasets:Array<DatasetProps>
}

const Chart = ({datasets, labels}:ChartProps) => {

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
            height={900}
            
        />
    )
}


export default Chart;