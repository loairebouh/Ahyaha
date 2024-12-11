import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import slogenImage from "../assets/heart.png";
import qotra from "../assets/qotralogo.png";

const Home: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div>
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
					<div className="text-5xl font-medium">Donation List</div>
				</div>
			</div>
			<div className="text-center align-bottom mt-10 mb-0 pb-0">
				All Rights Reserved to Qotra Development 2025
			</div>
			<div>
				<img src={qotra} alt="qotra image" className="w-10 mx-auto" />
			</div>
		</div>
	);
};

export default Home;
