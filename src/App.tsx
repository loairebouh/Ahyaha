import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import AddDonorForm from "./components/AddDonorForm";
import DonorList from "./pages/DonorList";
import BankStatus from "./pages/BankStatus";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/home" element={<Home />} />
				<Route path="/add-donor" element={<AddDonorForm />} />
				<Route path="/donor-list" element={<DonorList />} />
				<Route path="/bank-status" element={<BankStatus />} />
			</Routes>
		</Router>
	);
};

export default App;
