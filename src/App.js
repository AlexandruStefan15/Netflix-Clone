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
import { BrowseLayout } from "./layouts/BrowseLayout/BrowseLayout";
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
			<Route path="/browse" element={<BrowseLayout />}>
				<Route index element={<Discover />} />
				<Route path="movies" element={<Movies />} />
				<Route path="tv-series" element={<TvSeries />} />
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
