import React, { useState } from "react";
import { UserContext } from "./Context/UserContext";
import "./styles/App.scss";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Browse from "./Pages/Browse/Browse";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Home />} />
			<Route path="login" element={<Login />} />
			<Route path="browse" element={<Browse />} />
		</>
	)
);

function App() {
	const [userEmail, setUserEmail] = useState("");

	return (
		<UserContext.Provider value={{ userEmail, setUserEmail }}>
			<RouterProvider router={router} />
		</UserContext.Provider>
	);
}

export default App;
