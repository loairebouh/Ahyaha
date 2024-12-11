import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import slogenImage from "../assets/heart.png";

const Home: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="relative shadow rounded">
			<NavBar></NavBar>
			<img
				src={slogenImage}
				alt="Description of the image"
				className=" mt-10 my-15 mx-auto"
			/>
			<div className="grid grid-cols-2 gap-4 p-8 mb-20">
				<div
					onClick={() => navigate("/add-donor")}
					className="bg-green-500 text-white py-20 rounded-xl shadow text-center cursor-pointer "
				>
					<div className="text-5xl font-medium">Add Donor</div>
				</div>
				<div
					onClick={() => navigate("/donor-list")}
					className="bg-blue-950	 text-white py-20 rounded-xl shadow text-center cursor-pointer"
				>
					<div className="text-5xl font-medium">Donations List</div>
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
