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
import Discover from "./Pages/Discover/Discover";
import Movies from "./Pages/Movies/Movies";
import TvSeries from "./Pages/TvSeries/TvSeries";
import Popular from "./Pages/Popular/Popular";
import SearchResults from "./Pages/SearchResults/SearchResults";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/browse" element={<Browse />}>
				<Route index element={<Discover />} />
				<Route path="movies/:genreId?" element={<Movies />} />
				<Route path="tv-series/:genreId?" element={<TvSeries />} />
				<Route path="popular" element={<Popular />} />
				<Route path="search" element={<SearchResults />} />
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
