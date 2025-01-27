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
import Discover from "./Components/Sections/Discover/Discover";
import Movies from "./Components/Sections/Movies/Movies";
import TvSeries from "./Components/Sections/TvSeries/TvSeries";
import Popular from "./Components/Sections/Popular/Popular";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/browse" element={<Browse />}>
				<Route index element={<Discover />} />
				<Route path="movies" element={<Movies />} />
				<Route path="tv-series" element={<TvSeries />} />
				<Route path="popular" element={<Popular />} />
			</Route>
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
