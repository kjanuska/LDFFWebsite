import Film from "./Film";
import ContactInfo from "./ContactInfo";
import Sponsors from "./Sponsors";

import films2022 from "../data/2022.json";
import films2023 from "../data/2023.json";
import translations from "../data/translation.json";

const FrontPage = ({ language }) => {
	return (
		<>
			<div className="container content center padding-64" style={{"maxWidth": "1000px"}}>
				<img src="../img/logos/ldff-logo.png" alt="LDFF logo" width="100" height="100" />
				<h1 className="wide title">{translations[language].mainTitle}</h1>
			</div>

			<div className="black">
				<div className="container content padding-32" style={{"maxWidth": "980px"}}>
					<h2 className="wide center padding-32">{`${films2023.year} ${films2023[language].yearFilms}`}</h2>
					<div className="row-padding padding-32" style={{"margin": "0 -16px"}}>
						{films2023[language].films.map((film) => (
							<Film translation={film} commonInfo={films2023["common"][film.id]} language={language} year={films2023.year} key={film.id}/>
						))}
					</div>
				</div>
			</div>

			<Sponsors />

			<ContactInfo />
		</>
	);
};

export default FrontPage;
