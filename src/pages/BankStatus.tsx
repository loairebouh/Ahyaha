/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import NavBar from "@/components/NavBar";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const BankStatus: React.FC = () => {
	const [chartData, setChartData] = useState<any>(null);

	useEffect(() => {
		const donors = JSON.parse(localStorage.getItem("donors") || "[]");
		const bloodGroups = ["A", "B", "AB", "O"];
		const rhFactors = ["+", "-"];
		const data: any = {};
		bloodGroups.forEach((bloodGroup) => {
			rhFactors.forEach((rh) => {
				data[`${bloodGroup}${rh}`] = 0;
			});
		});
		donors.forEach((donor: any) => {
			const key = `${donor.bloodGroup}${donor.rhFactor}`;
			if (data[key] !== undefined) {
				data[key] += 1;
			}
		});
		const chartData = {
			labels: [
				"A (+)",
				"A (-)",
				"B (+)",
				"B (-)",
				"AB (+)",
				"AB (-)",
				"O (+)",
				"O (-)",
			],
			datasets: [
				{
					label: "Number of Donors",
					data: [
						data["A+"],
						data["A-"],
						data["B+"],
						data["B-"],
						data["AB+"],
						data["AB-"],
						data["O+"],
						data["O-"],
					],
					backgroundColor: "rgba(75, 192, 192, 0.2)",
					borderColor: "rgba(75, 192, 192, 1)",
					borderWidth: 1,
				},
			],
		};

		// Set the chart data
		setChartData(chartData);
	}, []);

	return (
		<div>
			<NavBar></NavBar>
			<div className="p-20 mb-0">
				<h2 className="text-5xl text-center font-semibold mb-3 mx-auto">
					Bank Status
				</h2>
				<div className="p-10 mt-0">
					{chartData ? <Bar data={chartData} /> : <p>Loading...</p>}
				</div>
			</div>
		</div>
	);
};

export default BankStatus;
