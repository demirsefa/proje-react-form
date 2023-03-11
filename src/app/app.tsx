import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Basic } from "./pages/basic";
import { Menu } from "./pages/menu";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Menu />} />
				<Route path={"/basic"} element={<Basic />} />
			</Routes>
		</BrowserRouter>
	);
}
