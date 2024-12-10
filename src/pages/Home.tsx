import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Home: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div>
			<NavBar></NavBar>
			<div className="grid grid-cols-2 gap-4 p-8">
				<div
					onClick={() => navigate("/add-donor")}
					className="bg-blue-500 text-white p-8 rounded shadow text-center cursor-pointer"
				>
					<h2>Add Donor</h2>
				</div>
				<div
					onClick={() => navigate("/donor-list")}
					className="bg-green-500 text-white p-8 rounded shadow text-center cursor-pointer"
				>
					<h2>View Donors</h2>
				</div>
			</div>
		</div>
	);
};

export default Home;
