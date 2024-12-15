import React from "react";
import "./styles/App.scss";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
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
	return <RouterProvider router={router} />;
}

export default App;
