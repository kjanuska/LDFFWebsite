import PhotoAlbum from "react-photo-album";
import { useState } from "react";

import photos from "../data/photos/photos2023";

import translations from "../data/translation.json";
import "../styles/photos.css";

const Photos = ({ language }) => {
	const [year, setYear] = useState(2023);

	return (
        <div>
			<h1 className="wide title" style={{"margin": "100px 0px 50px 0px"}}>{`${year} ${translations[language].photos}`}</h1>
			<div id="photo-container">
				<PhotoAlbum layout="masonry" photos={photos} />
			</div>
            <div id="photographers" className="black">
				<h2 >{translations[language].photographers}</h2>
				<div>
					<p>Nijolė Shuberg</p>
					<p>Visata Rupeika</p>
					<p>Jonas Kuprys</p>
				</div>
			</div>
        </div>
	);
};

export default Photos;
