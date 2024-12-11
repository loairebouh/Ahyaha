import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
	const location = useLocation();

	return (
		<nav className="bg-blue-950 text-white p-4 flex items-center">
			<ul className="flex flex-row gap-8 items-center mx-auto text-3xl">
				<li className={location.pathname === "/add-donor" ? "font-bold" : ""}>
					<Link className="text-green-500" to="/add-donor">
						New
					</Link>
				</li>
				<li className={location.pathname === "/home" ? "font-bold" : ""}>
					<Link to="/home">Home</Link>
				</li>
				<li className={location.pathname === "/donor-list" ? "font-bold" : ""}>
					<Link to="/donor-list">Donors List</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
