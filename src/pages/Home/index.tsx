import React, { MouseEvent, useEffect, useState } from 'react';
import { format as formatDate } from 'date-fns';
import Button from '../../components/Button';
import Chart from "../../components/Chart";
import Editor from '../../components/Editor';
import { EventDataProps, EventProps, EventsDataProps, EventSpanProps, EventStartProps } from '../../interfaces';
import { serializeDataForGraph } from '../../services/utils';
import dataDefault from './dataDefault';
import "./styles.css";



interface DatasetsProps {
	label: string,
	data: Array<number>
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

	function handleGenerateDate() {
		handlePrepareData(dataCodeEditor)
	}

	function handlePrepareData(data = JSON.stringify(dataDefault)) {
		try {


			const allEventsData: EventsDataProps[] = JSON.parse(data);
			if (allEventsData.length === 0) return;
			const indexArray = 0
			const dataEvents = allEventsData.filter(event => event.type === "data") as EventDataProps[];
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

			const datasets = serializeDataForGraph(datesValid, group, select);

			setSetLabels(labels)
			setSetDatasets(datasets)

		} catch (error) {
			alert("Formato não suportado")
		}
	}

	useEffect(loadDataDefault, [])
	useEffect(handlePrepareData, [])

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
				<Button label="GENERATE CHART" name="generateChart" onClick={handleGenerateDate} />
			</footer>
		</div >
	)
}

export default Home;
