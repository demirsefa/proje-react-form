import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuPage from "./menu.page";
import BasicPage from "./pages/basic.page";
import AllValidationsPage from "./pages/all-validations.page";
import CustomValidationPage from "./pages/custom-validation.page";
import AsyncValidationPage from "./pages/async-validation.page";
import AsyncSubmitPage from "./pages/async-submit.page";
import CustomComponentPage from "./pages/custom-component.page";
import SimpleWithoutContextPage from "./pages/simple-without-context.page";
import WatcherFormPage from "./pages/watcher-form.page";
import ConfirmPage from "./pages/confirm.page";
import DebouncePage from "./pages/debounce.page";
import SubmitConditionPage from "./pages/submit-condition.page";

function App() {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<div className="app">
					<Routes>
						<Route path="/" element={<MenuPage />} />
						<Route path="/basic" element={<BasicPage />} />
						<Route path="/debounce" element={<DebouncePage />} />
						<Route path="/submit-condition" element={<SubmitConditionPage />} />
						<Route path="/all-validations" element={<AllValidationsPage />} />
						<Route path="/custom-validation" element={<CustomValidationPage />} />
						<Route path="/async-validation" element={<AsyncValidationPage />} />
						<Route path="/async-submit" element={<AsyncSubmitPage />} />
						<Route path="/custom-component" element={<CustomComponentPage />} />
						<Route path="/watcher-form-page" element={<WatcherFormPage />} />
						<Route path="/simple-without-context" element={<SimpleWithoutContextPage />} />
						<Route path="/confirm" element={<ConfirmPage />} />
					</Routes>
				</div>
			</BrowserRouter>
		</React.StrictMode>
	);
}

export default App;
