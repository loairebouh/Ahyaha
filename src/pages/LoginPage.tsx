import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		if (username === "qotra" && password === "admin") {
			alert("Login successful!");
			navigate("/home");
		} else {
			alert("Invalid username or password");
		}
	};

	return (
		<div>
			<div className="flex items-center justify-center h-screen bg-gray-100">
				<form
					onSubmit={handleLogin}
					className="p-4 bg-white shadow rounded space-y-4"
				>
					<h2 className="text-lg font-semibold">Login</h2>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full border rounded px-3 py-2"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full border rounded px-3 py-2"
					/>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
