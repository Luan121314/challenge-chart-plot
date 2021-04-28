import { ChartOptions } from "chart.js";

const options: ChartOptions = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: "right",
            reverse: false,
            align: 'start',
            labels: {
                font: {
                    size: 12,
                    family: "Source Sans Pro",
                    lineHeight: 1.2,
                    style: "normal",
                    weight: "700",
                },
                color:{},
                usePointStyle: true,
                padding: 15
            }
        },


    }

}


export default options;