import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const AddDonorForm: React.FC = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		fullName: "",
		phoneNumber: "",
		address: "",
		marriedStatus: false,
		dateOfBirth: "",
		placeOfBirth: "",
		email: "",
		bloodGroup: "",
		rhFactor: "",
		phenotype: "",
	});
	const [showPopup, setShowPopup] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const target = e.target as HTMLInputElement | HTMLSelectElement;
		const { name, value, type } = target;
		const checked = (target as HTMLInputElement).checked;

		setForm({
			...form,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Save data to localStorage
		const newDonor = { id: Date.now(), ...form }; // Add unique ID
		const existingDonors = JSON.parse(localStorage.getItem("donors") || "[]");
		localStorage.setItem(
			"donors",
			JSON.stringify([...existingDonors, newDonor])
		);

		// Show popup
		setShowPopup(true);

		// Hide popup after 2 seconds and redirect
		setTimeout(() => {
			setShowPopup(false);
			navigate("/donor-list");
		}, 2000);

		// Reset form state
		setForm({
			fullName: "",
			phoneNumber: "",
			address: "",
			marriedStatus: false,
			dateOfBirth: "",
			placeOfBirth: "",
			email: "",
			bloodGroup: "",
			rhFactor: "",
			phenotype: "",
		});
	};

	return (
		<div>
			<NavBar />
			{showPopup && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-green-500 text-white p-4 rounded-lg shadow-lg animate-bounce">
						Adding donor...
					</div>
				</div>
			)}
			<form
				onSubmit={handleSubmit}
				className="p-4 bg-white shadow rounded space-y-4"
			>
				{/* Form Inputs */}
				<input
					name="fullName"
					type="text"
					placeholder="Full Name"
					value={form.fullName}
					onChange={handleInputChange}
					className="block w-full border-gray-300 rounded-md shadow-sm"
				/>
				<input
					name="phoneNumber"
					type="tel"
					placeholder="Phone Number"
					value={form.phoneNumber}
					onChange={handleInputChange}
					className="block w-full border-gray-300 rounded-md shadow-sm"
				/>
				<input
					name="address"
					type="text"
					placeholder="Address"
					value={form.address}
					onChange={handleInputChange}
					className="block w-full border-gray-300 rounded-md shadow-sm"
				/>
				<input
					name="dateOfBirth"
					type="date"
					placeholder="Date of Birth"
					value={form.dateOfBirth}
					onChange={handleInputChange}
					className="block w-full border-gray-300 rounded-md shadow-sm"
				/>
				<input
					name="placeOfBirth"
					type="text"
					placeholder="Place of Birth"
					value={form.placeOfBirth}
					onChange={handleInputChange}
					className="block w-full border-gray-300 rounded-md shadow-sm"
				/>
				<input
					name="email"
					type="email"
					placeholder="Email Address"
					value={form.email}
					onChange={handleInputChange}
					className="block w-full border-gray-300 rounded-md shadow-sm"
				/>
				<select
					name="bloodGroup"
					value={form.bloodGroup}
					onChange={handleInputChange}
					className="block w-full border-gray-300 rounded-md shadow-sm"
				>
					<option value="">Select Blood Group</option>
					<option value="A">A</option>
					<option value="B">B</option>
					<option value="AB">AB</option>
					<option value="O">O</option>
				</select>
				<select
					name="rhFactor"
					value={form.rhFactor}
					onChange={handleInputChange}
					className="block w-full border-gray-300 rounded-md shadow-sm"
				>
					<option value="">Select Rh Factor</option>
					<option value="+">+</option>
					<option value="-">-</option>
				</select>
				<input
					name="phenotype"
					type="text"
					placeholder="Blood Phenotype"
					value={form.phenotype}
					onChange={handleInputChange}
					className="block w-full border-gray-300 rounded-md shadow-sm"
				/>
				<label className="flex items-center space-x-2">
					<input
						name="marriedStatus"
						type="checkbox"
						checked={form.marriedStatus}
						onChange={handleInputChange}
						className="h-4 w-4 text-blue-600"
					/>
					<span>Married</span>
				</label>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 rounded"
				>
					Add Donor
				</button>
			</form>
		</div>
	);
};

export default AddDonorForm;
