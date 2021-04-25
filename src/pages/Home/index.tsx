import React, { MouseEvent, useEffect, useState } from 'react';
import { format as formatDate } from 'date-fns'
import Button from '../../components/Button';
import Editor from '../../components/Editor';
import Chart from "../../components/Chart";
import dataDefault from './dataDefault';
import { randomNumber } from '../../services/utils';
import { EventsDataProps, EventDataProps, EventSpanProps, EventStartProps, EventProps } from '../../interfaces';
import "./styles.css";



interface DatasetsProps{
	label:string,
	data:Array<number>
}


const Home = () => {

	const [height, setHeight] = useState(0)
	const [isClicked, setIsClicked] = useState(false)
	const [dataCodeEditor, setCodeDataEditor] = useState("[]");
	const [datasets, setSetDatasets] = useState<DatasetsProps[]>([])
	const [labels, setSetLabels] = useState<string[]>([])


	function handleMouseMove(e: MouseEvent) {
		if (!isClicked) return;
		if (e.pageY < 200) return
		setHeight(e.pageY)

	}

	function handleClickDown() {
		setIsClicked(true);
	}
	function handleClickUp() {
		setIsClicked(false)
	}

	function loadDataDefault() {
		setCodeDataEditor(JSON.stringify(dataDefault))
	}


	function handlePrepareData() {
		const allEventsData: EventsDataProps[] = JSON.parse(dataCodeEditor);
		if (allEventsData.length === 0) return;
		const indexArray = 0
		const dataEvents = allEventsData.filter(event => event.type === "data")
			.sort((a, b) => new Date(a.timestamp).getTime() - new Date(a.timestamp).getTime()) as EventDataProps[];
		const spanEvent = allEventsData.filter(event => event.type === "span")[indexArray] as EventSpanProps;
		const startEvent = allEventsData.filter(event => event.type === "start")[indexArray] as EventStartProps;
		const stopEvent = allEventsData.filter(event => event.type === "stop")[indexArray] as EventProps;
		const datesValid = dataEvents.filter(event => event.timestamp >= spanEvent.begin && event.timestamp <= spanEvent.end);
		const { group, select } = startEvent;
		const { begin, end } = spanEvent

		const labels = [
			formatDate(begin, "HH:mm"),
			formatDate(end, "HH:mm")
		]

		let datasets = []

			for (let e = 0; e < datesValid.length; e++) {
				datasets.push({
					//@ts-ignore
					label: `${datesValid[e].os} ${datesValid[e].browser} ${datesValid[e].max_response_time} `,
					data:[datesValid[e].max_response_time, datesValid[e].min_response_time]
				})
			}

		console.log(datasets);
		setSetLabels(labels)
		setSetDatasets(datasets)

	}

	useEffect(loadDataDefault, [])
	useEffect(handlePrepareData, [dataCodeEditor])


	return (
		<div id="home-container">
			<header>
				<h1>Luan's Challenge</h1>
			</header>
			<main>
				<div
					className="input-code"
					style={{ height: `${height - 75}px` }}  >
					<Editor
						value={dataCodeEditor}
						onChange={(e) => { setCodeDataEditor(e as string) }}
					/>

					<div className="dragbar"
						onMouseMove={handleMouseMove}
						onMouseDown={handleClickDown}
						onMouseUp={handleClickUp}>
						<div></div>
						<div></div>
					</div>

				</div>
				<div className="graph">
					<Chart labels={labels} datasets={datasets} />
				</div>
			</main>
			<footer>
				<Button label="GENERATE CHART" name="generateChart" onClick={handlePrepareData} />
			</footer>
		</div >
	)
}

export default Home;
