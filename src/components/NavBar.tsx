import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleSignOut = () => {
		localStorage.removeItem("user");
		navigate("/login");
	};

	return (
		<nav className="bg-blue-950 text-white p-4 flex items-center justify-between">
			<ul className="flex flex-row  ml-10 gap-10 items-center text-xl font-semiBold">
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
			<div className="flex space-x-4">
				<button
					onClick={() => navigate("/add-donor")}
					className="bg-green-500 text-white px-10 py-2 rounded"
				>
					<span className="flex flew-row justify-center gap-3">
						Add Donor{" "}
						<span className="my-auto">
							{" "}
							<FaRegPlusSquare />
						</span>
					</span>
				</button>
				<button
					onClick={handleSignOut}
					className="bg-red-500 text-white px-4 py-2 rounded"
				>
					<span className="flex flew-row justify-center gap-3">
						Sign Out
						<span className="my-auto">
							<FaSignOutAlt />
						</span>
					</span>
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
