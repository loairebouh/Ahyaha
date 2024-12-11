/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Line } from "react-chartjs-2";
import cover from "@/assets/last-one.jpg";
import slogen from "@/assets/slogen-main.png";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const Home: React.FC = () => {
	const navigate = useNavigate();
	const [currentDateTime, setCurrentDateTime] = useState<string>("");
	const [lastDonors, setLastDonors] = useState<any[]>([]);
	const [donationsData, setDonationsData] = useState<{
		labels: string[];
		data: number[];
	}>({ labels: [], data: [] });

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			setCurrentDateTime(now.toLocaleString());
		}, 1000);

		const storedDonors = JSON.parse(localStorage.getItem("donors") || "[]");
		setLastDonors(storedDonors.slice(-5));
		const donationsPerDay: { [key: string]: number } = {};
		storedDonors.forEach((donor: any) => {
			const donationDate = new Date(donor.donationDate).toLocaleDateString();
			donationsPerDay[donationDate] = donationsPerDay[donationDate]
				? donationsPerDay[donationDate] + 1
				: 1;
		});
		const labels = Object.keys(donationsPerDay);
		const data = Object.values(donationsPerDay);
		setDonationsData({ labels, data });

		return () => clearInterval(interval);
	}, []);

	const bankStatusData = {
		labels: donationsData.labels,
		datasets: [
			{
				label: "Donations per Day",
				data: donationsData.data,
				fill: false,
				borderColor: "#4CAF50",
				tension: 0.1,
			},
		],
	};

	return (
		<div className="relative bg-gray-50 min-h-screen">
			<NavBar />
			<div className="flex flex-col items-center justify-center p-6">
				<h2 className="text-4xl font-bold text-blue-950 mb-4">
					Welcome to Ahyaha App
				</h2>
				<p className="text-xl font-medium text-blue-950 mb-4">
					Today's date and time: {currentDateTime}
				</p>
				<img
					src={slogen}
					className=" h-auto object-cover rounded-xl mb-8"
					alt="Slogen"
				/>
			</div>
			<div className="container mx-auto p-8">
				<div className="flex flex-col space-y-8">
					<div className="bg-white p-6 rounded-xl shadow-lg">
						<h3 className="text-2xl font-bold text-gray-800 mb-4">
							Last Donors
						</h3>
						<ul>
							{lastDonors.length > 0 ? (
								lastDonors.map((donor, index) => (
									<li key={donor.id} className="mb-4 border-b pb-2">
										<div className="text-lg font-semibold">
											{donor.fullName}
										</div>
										<div className="text-sm text-gray-600">
											{donor.donationDate}
										</div>
									</li>
								))
							) : (
								<li>No donors found.</li>
							)}
						</ul>
					</div>

					<div className="grid grid-cols-4">
						<div className="bg-white p-6 rounded-xl shadow-lg w-full col-span-2">
							<h3 className="text-2xl font-bold text-gray-800 mb-4">
								Bank Status Curve
							</h3>
							<Line data={bankStatusData} options={{ responsive: true }} />
						</div>
						<div className="w-full shadow-lg mt-15 py-auto col-span-2">
							<div className="w-full rounded-xl mb-4">
								<img
									src={cover}
									alt="Cover"
									className="w-full h-auto object-cover rounded-xl"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<footer className="bg-blue-950 text-white text-center p-4 mt-4">
				<p>
					&copy; 2025 Ahyaha App. All Rights Reserved to Qotra Development 2025.
				</p>
			</footer>
		</div>
	);
};

export default Home;
