import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/App.css";
import Navigation from "./components/Navigation";
import FrontPage from "./components/FrontPage";
import Photos from "./components/Photos";
import { useState } from "react";
import { ENGLISH } from "./util/constants";

function App() {
	const [language, setLanguage] = useState(ENGLISH);
	return (
		<Router>
			<Navigation language={language} setLanguage={setLanguage} />
			<div className="content">
				<Routes>
					<Route path="/" element={<FrontPage language={language} />} />
					<Route path="/photos" element={<Photos language={language} />}/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
