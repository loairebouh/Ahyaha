import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleSignOut = () => {
		localStorage.removeItem("user");
		navigate("/login");
	};

	return (
		<nav className="bg-blue-950 text-white p-4 flex items-center justify-between">
			<ul className="flex flex-row gap-8 items-center text-3xl">
				<li
					className={
						location.pathname === "/add-donor"
							? "font-bold text-decoration: underline"
							: ""
					}
				>
					<Link className="text-green-500" to="/add-donor">
						New
					</Link>
				</li>
				<li
					className={
						location.pathname === "/home"
							? "font-bold text-decoration: underline"
							: ""
					}
				>
					<Link to="/home">Home</Link>
				</li>
				<li
					className={
						location.pathname === "/donor-list"
							? "font-bold text-decoration: underline"
							: ""
					}
				>
					<Link to="/donor-list">Donors List</Link>
				</li>
				<li
					className={
						location.pathname === "/bank-status"
							? "font-bold text-decoration: underline"
							: ""
					}
				>
					<Link to="/bank-status">Bank Status</Link>
				</li>
			</ul>
			<button
				onClick={handleSignOut}
				className="bg-red-500 text-white px-4 py-2 rounded"
			>
				Sign Out
			</button>
		</nav>
	);
};

export default Navbar;
