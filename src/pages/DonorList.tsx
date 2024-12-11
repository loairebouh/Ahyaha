/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Donor } from "../types/donor";
import NavBar from "../components/NavBar";

const DonorList: React.FC = () => {
	const [donors, setDonors] = useState<Donor[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchBy, setSearchBy] = useState("name");
	const [editingDonor, setEditingDonor] = useState<Donor | null>(null);
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");

	useEffect(() => {
		const storedDonors = JSON.parse(localStorage.getItem("donors") || "[]");
		setDonors(storedDonors);
	}, []);

	// Handle deleting a donor with confirmation
	const handleDelete = (id: number) => {
		const confirmation = window.prompt(
			"Type 'delete' to confirm the deletion of this donor."
		);

		if (confirmation?.toLowerCase() === "delete") {
			const updatedDonors = donors.filter((donor) => donor.id !== id);
			localStorage.setItem("donors", JSON.stringify(updatedDonors));
			setDonors(updatedDonors);
		} else {
			alert("Deletion cancelled. Type 'delete' to confirm.");
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		console.log("Updating donor:", { name, value });

		setEditingDonor((prev) => {
			if (!prev) return prev;
			return { ...prev, [name]: value };
		});
	};

	const handleEditSave = () => {
		if (editingDonor) {
			const updatedDonors = donors.map((donor) =>
				donor.id === editingDonor.id ? editingDonor : donor
			);
			localStorage.setItem("donors", JSON.stringify(updatedDonors));
			setDonors(updatedDonors);
			setEditingDonor(null);
		}
	};

	const filteredDonors = donors
		.filter((donor) => {
			const query = searchQuery.toLowerCase();
			const customId = donor.customId || "";
			const donationDate = new Date(donor.donationDate);

			// Filter by search query
			let matchesQuery = false;
			if (searchBy === "name") {
				matchesQuery = donor.fullName.toLowerCase().includes(query);
			} else if (searchBy === "bloodGroup") {
				matchesQuery = donor.bloodGroup.toLowerCase().includes(query);
			} else if (searchBy === "customId") {
				matchesQuery = customId.toLowerCase().includes(query);
			} else if (searchBy === "donationDate") {
				matchesQuery = donor.donationDate.toLowerCase().includes(query);
			} else if (searchBy === "phenotype") {
				matchesQuery = donor.phenotype?.toLowerCase().includes(query); // Added phenotype condition
			}

			// Filter by date range
			const matchesDateRange =
				(!startDate || donationDate >= new Date(startDate)) &&
				(!endDate || donationDate <= new Date(endDate));

			return matchesQuery && matchesDateRange;
		})
		.reverse();

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="flex-grow p-4 bg-white shadow rounded relative ">
				<h2 className="mt-10 text-4xl text-center font-semibold mb-7">
					Donations List
				</h2>
				<div className="mb-4 grid grid-cols-10 gap-4">
					<input
						type="text"
						placeholder={`Search by ${
							searchBy === "name"
								? "Name"
								: searchBy === "bloodGroup"
								? "Blood Group"
								: searchBy === "customId"
								? "Custom ID"
								: "Donation Date"
						}`}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="border border-blue-950 rounded px-4 py-2 w-full col-span-6"
					/>
					<select
						value={searchBy}
						onChange={(e) => setSearchBy(e.target.value)}
						className="border border-red-800 rounded px-4 py-2 col-span-4"
					>
						<option value="name">Name</option>
						<option value="bloodGroup">Blood Group</option>
						<option value="customId">Custom ID</option>
						<option value="phenotype">Phenotype</option>
					</select>
				</div>
				<div className="grid grid-cols-2  justify-center my-5 mx-auto">
					<div className="flex flex-row gap-4 col-span-1">
						<span className="my-auto">Start Date</span>
						<input
							type="date"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							className="text-center border border-gray-300 rounded px-4 py-2 col-span-4"
							placeholder="Start Date"
						/>
					</div>
					<div className="flex flex-row gap-4 col-span-1">
						<span className="my-auto">End Date</span>
						<input
							type="date"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							className="border border-gray-300 rounded px-4 py-2 col-span-4"
							placeholder="End Date"
						/>
					</div>
				</div>

				<table className="table-auto w-full border-collapse border border-gray-500">
					<thead>
						<tr className="bg-gray-100">
							<th className="border px-4 py-2">Donation Date</th>{" "}
							<th className="border px-4 py-2">Custom ID</th>
							<th className="border px-4 py-2">Name</th>
							<th className="border px-4 py-2">Phone</th>
							<th className="border px-4 py-2">Address</th>
							<th className="border px-4 py-2">Blood Group</th>
							<th className="border px-4 py-2">Rh Factor</th>
							<th className="border px-4 py-2">Phenotype</th>
							<th className="border px-4 py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredDonors.length > 0 ? (
							filteredDonors.map((donor) => (
								<tr key={donor.id} className="hover:bg-gray-50">
									<td className="border px-4 py-2 text-center">
										{donor.donationDate}
									</td>{" "}
									<td className="border px-4 py-2 text-center ">
										{donor.customId}
									</td>
									<td className="border px-4 py-2 text-center font-bold">
										{donor.fullName}
									</td>
									<td className="border px-4 py-2 text-center">
										{donor.phoneNumber}
									</td>
									<td className="border px-4 py-2">{donor.address}</td>
									<td className="border px-4 py-2 text-center font-bold ">
										{donor.bloodGroup}
									</td>
									<td className="border px-4 py-2 text-center font-bold ">
										{donor.rhFactor}
									</td>
									<td className="border px-4 py-2 text-center font-bold">
										{donor.phenotype}
									</td>
									<td className="border	 px-4 py-2 flex flex-row gap-2 items-center justify-center">
										<button
											onClick={() => setEditingDonor(donor)}
											className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-gray-700"
										>
											Edit
										</button>
										<button
											onClick={() => {
												if (donor.id !== undefined) {
													const confirmDelete = window.prompt(
														"Type 'DELETE' to confirm the deletion"
													);
													if (confirmDelete === "DELETE") {
														handleDelete(donor.id);
													} else {
														alert("Delete operation canceled.");
													}
												} else {
													alert("Invalid donor ID");
												}
											}}
											className="bg-red-500 text-white px-2 py-1 rounded hover:bg-gray-700"
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									className="text-center border px-4 py-2 text-gray-500"
									colSpan={9}
								>
									No donors found.
								</td>
							</tr>
						)}
					</tbody>
				</table>

				{editingDonor && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<div className="bg-white p-6 rounded shadow-md w-96">
							<h3 className="text-lg font-semibold mb-4">Edit Donor</h3>
							<div className="space-y-4">
								<div className="relative">
									<input
										name="id"
										type="text"
										placeholder="ID"
										value={editingDonor.customId}
										className="block w-full border-gray-300 rounded-md shadow-sm"
										readOnly
									/>
								</div>
								<div className="relative">
									<input
										name="fullName"
										type="text"
										placeholder="Full Name *"
										value={editingDonor.fullName}
										onChange={handleInputChange}
										className="block w-full border-gray-300 rounded-md shadow-sm"
										required
									/>
									<span className="absolute text-red-500 text-xl top-2 right-2">
										*
									</span>
								</div>
								<div className="relative">
									<input
										name="phoneNumber"
										type="text"
										placeholder="Phone Number *"
										value={editingDonor.phoneNumber}
										onChange={handleInputChange}
										className="block w-full border-gray-300 rounded-md shadow-sm"
										required
									/>
									<span className="absolute text-red-500 text-xl top-2 right-2">
										*
									</span>
								</div>
								<div className="relative">
									<input
										name="address"
										type="text"
										placeholder="Address"
										value={editingDonor.address}
										onChange={handleInputChange}
										className="block w-full border-gray-300 rounded-md shadow-sm"
									/>
								</div>

								{/* Email */}
								<div className="relative">
									<input
										name="email"
										type="email"
										placeholder="Email"
										value={editingDonor.email}
										onChange={handleInputChange}
										className="block w-full border-gray-300 rounded-md shadow-sm"
									/>
								</div>

								{/* Blood Group */}
								<div className="relative">
									<input
										name="bloodGroup"
										type="text"
										placeholder="Blood Group"
										value={editingDonor.bloodGroup}
										onChange={handleInputChange}
										className="block w-full border-gray-300 rounded-md shadow-sm"
									/>
								</div>

								{/* Rh Factor */}
								<div className="relative">
									<select
										name="rhFactor"
										value={editingDonor.rhFactor}
										onChange={handleInputChange}
										className="block w-full border-gray-300 rounded-md shadow-sm"
									>
										<option value="positive">Positive</option>
										<option value="negative">Negative</option>
									</select>
								</div>

								{/* Donation Date */}
								<div className="relative">
									<input
										name="donationDate"
										type="date"
										placeholder="Donation Date"
										value={editingDonor.donationDate}
										onChange={handleInputChange}
										className="block w-full border-gray-300 rounded-md shadow-sm"
									/>
								</div>

								<div className="mt-4 flex justify-end space-x-2">
									<button
										onClick={() => setEditingDonor(null)}
										className="bg-gray-500 text-white px-4 py-2 rounded"
									>
										Cancel
									</button>
									<button
										onClick={handleEditSave}
										className="bg-blue-500 text-white px-4 py-2 rounded"
									>
										Save
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<footer className="bg-blue-950 text-white text-center p-4 mt-4">
				<p>
					&copy; 2025 Ahyaha App. All Rights Reserved to Qotra Development 2025.
				</p>
			</footer>
		</div>
	);
};

export default DonorList;
