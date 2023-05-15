import { Link } from "react-router-dom";
import { ENGLISH, LITHUANIAN } from "../util/constants";

import translations from "../data/translation.json";

const Navigation = ({ language, setLanguage }) => {
	return (
		<>
			<div id="navbar" className="top">
				<div className="bar black card">
					<a
						className="bar-item button padding-large hide-medium hide-large right"
						href="javascript:void(0)"
						title="Toggle Navigation Menu">
						<i className="fa fa-bars"></i>
					</a>
					{/* <a href="#" className="bar-item button padding-large hide-small">
						LDFF 2022
					</a> */}
					{/* <a href="#contact" className="bar-item button padding-large hide-small">
						CONTACT
					</a> */}
					<nav>
						<Link className="bar-item button padding-large hide-small" to="/">
							LDFF
						</Link>
						<Link className="bar-item button padding-large hide-small" to="/photos">
							{translations[language].photos}
						</Link>
					</nav>

					<div className="lang-btns">
						<a onClick={() => setLanguage(LITHUANIAN)} className="bar-lang button padding-large">
							<img className="lang-img" src="/img/flags/lt.png" />
							LT
						</a>
						<a onClick={() => setLanguage(ENGLISH)} className="bar-lang button padding-large">
							<img className="lang-img" src="/img/flags/us.png" />
							EN
						</a>
					</div>
				</div>
			</div>

			{/* <div id="navMenu" className="bar-block black hide hide-large hide-medium top" style={{ marginTop: "46px" }}>
				<a href="#contact" className="bar-item button padding-large">
					CONTACT
				</a>
			</div> */}
		</>
	);
};

export default Navigation;
