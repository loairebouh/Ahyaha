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
		// Fetch donor data from localStorage
		const donors = JSON.parse(localStorage.getItem("donors") || "[]");

		// Initialize a data structure to store counts based on blood group and Rh factor
		const bloodGroups = ["A", "B", "AB", "O"];
		const rhFactors = ["+", "-"];

		// Create an object to hold the count of donors for each blood group and Rh factor combination
		const data: any = {};

		bloodGroups.forEach((bloodGroup) => {
			rhFactors.forEach((rh) => {
				data[`${bloodGroup}${rh}`] = 0; // Initialize the count for each combination
			});
		});

		// Count donors based on their blood group and Rh factor
		donors.forEach((donor: any) => {
			const key = `${donor.bloodGroup}${donor.rhFactor}`;
			if (data[key] !== undefined) {
				data[key] += 1; // Increment count for this specific combination
			}
		});

		// Prepare data for the chart
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
					backgroundColor: "rgba(75, 192, 192, 0.2)", // Light green color for bars
					borderColor: "rgba(75, 192, 192, 1)", // Darker green color for borders
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
			<div className="p-20 mb-10">
				<h2 className="text-2xl font-semibold mb-4 mx-auto">Bank Status</h2>
				{chartData ? <Bar data={chartData} /> : <p>Loading...</p>}
			</div>
		</div>
	);
};

export default BankStatus;
