import React, { useEffect, useState } from "react";
import { Donor } from "../types/donor";
import NavBar from "../components/NavBar";

const DonorList: React.FC = () => {
	const [donors, setDonors] = useState<Donor[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchBy, setSearchBy] = useState("name");
	const [editingDonor, setEditingDonor] = useState<Donor | null>(null);

	useEffect(() => {
		// Load donors from localStorage
		const storedDonors = JSON.parse(localStorage.getItem("donors") || "[]");
		setDonors(storedDonors);
	}, []);

	// Handle deleting a donor
	const handleDelete = (id: number) => {
		// Filter out the donor by ID
		const updatedDonors = donors.filter((donor) => donor.id !== id);

		// Update localStorage with the new donors list
		localStorage.setItem("donors", JSON.stringify(updatedDonors));
		setDonors(updatedDonors); // Update the state with the filtered list
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;
		const checked =
			type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

		setEditingDonor((prev) =>
			prev ? { ...prev, [name]: type === "checkbox" ? checked : value } : null
		);
	};

	const handleEditSave = () => {
		if (editingDonor) {
			// Save updated donor data in localStorage
			const updatedDonors = donors.map((donor) =>
				donor.id === editingDonor.id ? editingDonor : donor
			);
			localStorage.setItem("donors", JSON.stringify(updatedDonors));
			setDonors(updatedDonors);
			setEditingDonor(null);
		}
	};

	const filteredDonors = donors.filter((donor) => {
		if (searchBy === "name") {
			return donor.fullName.toLowerCase().includes(searchQuery.toLowerCase());
		} else if (searchBy === "bloodGroup") {
			return donor.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase());
		}
		return false;
	});

	return (
		<div>
			<NavBar />
			<div className="p-4 bg-white shadow rounded relative">
				<h2 className="text-lg font-semibold mb-4">Donor List</h2>

				<div className="mb-4 flex items-center space-x-2">
					<input
						type="text"
						placeholder={`Search by ${
							searchBy === "name" ? "Name" : "Blood Group"
						}`}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="border rounded px-4 py-2 w-full"
					/>
					<select
						value={searchBy}
						onChange={(e) => setSearchBy(e.target.value)}
						className="border rounded px-4 py-2"
					>
						<option value="name">Name</option>
						<option value="bloodGroup">Blood Group</option>
					</select>
				</div>

				<table className="table-auto w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100">
							<th className="border px-4 py-2">Name</th>
							<th className="border px-4 py-2">Phone</th>
							<th className="border px-4 py-2">Address</th>
							<th className="border px-4 py-2">Email</th>
							<th className="border px-4 py-2">Blood Group</th>
							<th className="border px-4 py-2">Rh Factor</th>
							<th className="border px-4 py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredDonors.length > 0 ? (
							filteredDonors.map((donor) => (
								<tr key={donor.id} className="hover:bg-gray-50">
									<td className="border px-4 py-2">{donor.fullName}</td>
									<td className="border px-4 py-2">{donor.phoneNumber}</td>
									<td className="border px-4 py-2">{donor.address}</td>
									<td className="border px-4 py-2">{donor.email}</td>
									<td className="border px-4 py-2">{donor.bloodGroup}</td>
									<td className="border px-4 py-2">{donor.rhFactor}</td>
									<td className="border px-4 py-2 flex space-x-2">
										<button
											onClick={() => setEditingDonor(donor)}
											className="bg-blue-500 text-white px-2 py-1 rounded"
										>
											Edit
										</button>
										<button
											onClick={() => handleDelete(donor.id)}
											className="bg-red-500 text-white px-2 py-1 rounded"
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={7}
									className="text-center border px-4 py-2 text-gray-500"
								>
									No donors found.
								</td>
							</tr>
						)}
					</tbody>
				</table>

				{/* Edit Donor Modal */}
				{editingDonor && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<div className="bg-white p-6 rounded shadow-md w-96">
							<h3 className="text-lg font-semibold mb-4">Edit Donor</h3>
							<div className="space-y-4">
								<input
									name="fullName"
									type="text"
									placeholder="Full Name"
									value={editingDonor.fullName}
									onChange={handleInputChange}
									className="block w-full border-gray-300 rounded-md shadow-sm"
								/>
								<input
									name="phoneNumber"
									type="text"
									placeholder="Phone Number"
									value={editingDonor.phoneNumber}
									onChange={handleInputChange}
									className="block w-full border-gray-300 rounded-md shadow-sm"
								/>
								<input
									name="address"
									type="text"
									placeholder="Address"
									value={editingDonor.address}
									onChange={handleInputChange}
									className="block w-full border-gray-300 rounded-md shadow-sm"
								/>
								<input
									name="email"
									type="email"
									placeholder="Email Address"
									value={editingDonor.email}
									onChange={handleInputChange}
									className="block w-full border-gray-300 rounded-md shadow-sm"
								/>
								<select
									name="bloodGroup"
									value={editingDonor.bloodGroup}
									onChange={handleInputChange}
									className="block w-full border-gray-300 rounded-md shadow-sm"
								>
									<option value="A">A</option>
									<option value="B">B</option>
									<option value="AB">AB</option>
									<option value="O">O</option>
								</select>
								<select
									name="rhFactor"
									value={editingDonor.rhFactor}
									onChange={handleInputChange}
									className="block w-full border-gray-300 rounded-md shadow-sm"
								>
									<option value="+">+</option>
									<option value="-">-</option>
								</select>
								<input
									name="phenotype"
									type="text"
									placeholder="Blood Phenotype"
									value={editingDonor.phenotype || ""}
									onChange={handleInputChange}
									className="block w-full border-gray-300 rounded-md shadow-sm"
								/>
								<label className="flex items-center space-x-2">
									<input
										name="marriedStatus"
										type="checkbox"
										checked={!!editingDonor.marriedStatus}
										onChange={handleInputChange}
										className="h-4 w-4 text-blue-600"
									/>
									<span>Married</span>
								</label>
							</div>
							<div className="mt-4 flex justify-end space-x-2">
								<button
									onClick={() => setEditingDonor(null)}
									className="px-4 py-2 bg-gray-300 rounded"
								>
									Cancel
								</button>
								<button
									onClick={handleEditSave}
									className="px-4 py-2 bg-blue-600 text-white rounded"
								>
									Save
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default DonorList;
