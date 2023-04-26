import "./styles/App.css";
import Navigation from "./components/Navigation";
import FrontPage from "./components/FrontPage";
import { useState } from "react";
import { ENGLISH } from "./util/constants";

function App() {
	const [language, setLanguage] = useState(ENGLISH);
	return (
		<>
			<Navigation setLanguage={setLanguage} />
			<FrontPage language={language} />
		</>
	);
}

export default App;
