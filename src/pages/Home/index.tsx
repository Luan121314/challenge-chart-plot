import React, { MouseEvent, useState } from 'react';
import Button from '../../components/Button';
import Editor from '../../components/Editor';
import Chart from "../../components/Chart";
import "./styles.css";

const Home = () => {





	const [height, setHeight] = useState(0)
	const [isClicked, setIsClicked] = useState(false)
	const [data, setData] = useState("")


	function handleMouseMove(e: MouseEvent) {
		if (!isClicked) return;
		if(e.pageY < 200)return
		setHeight(e.pageY)

	}

	function handleClickDown() {
		setIsClicked(true);
	}
	function handleClickUp() {
		setIsClicked(false)
	}

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
						value={data}
						onChange={(e) => { setData(e as string) }}
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
					<Chart/>
				</div>
			</main>
			<footer>
				<Button label="GENERATE CHART" name="generateChart" />
			</footer>
		</div >
	)
}

export default Home;