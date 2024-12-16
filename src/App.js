import React, { useState } from "react";
import { EmailContext } from "./Context/EmailContext";
import "./styles/App.scss";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

//import Header from "./Components/Header/Header";
//import Footer from "./Components/Footer/Footer";
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
	const [emailValue, setEmailValue] = useState("");

	return (
		<EmailContext.Provider value={{ emailValue, setEmailValue }}>
			<RouterProvider router={router} />
		</EmailContext.Provider>
	);
}

export default App;
