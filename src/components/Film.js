import addresses from "../data/addresses.json";
import BuyTickets from "./BuyTickets";

const IMAGE_PATH = "/img/posters/";

const Film = ({ translation, commonInfo, language, year }) => {
	return (
		<div style={{ marginTop: "30px" }}>
			{commonInfo.events.map((event, index) => {
				const address = addresses[event.address];
				const date = new Date(event.date);

				const options = {
					month: "long",
					day: "numeric",
				};

				const timeOptions = {
					hour: 'numeric',
					minute: 'numeric',
					timeZone: 'America/Chicago',
				}

				let dateString = date.toLocaleDateString(language, options);
				dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);
				return (
					<div key={`${commonInfo.posterName}${index}`}>
						<h4>{`${dateString}, ${date.toLocaleTimeString(language, timeOptions)}`}</h4>
						<a className="address" href={address.link} target="_blank">
							{address.name}
							<br />
							{address.line1}
							<br />
							{`${address.city}, ${address.state} ${address.zip}`}
						</a>
					</div>
				);
			})}

			<div className="film-info">
				<div className="flex-parent">
					<img className="poster" src={`${IMAGE_PATH}${year}/${translation.posterName}`} />
					<div className="film-text">
						<h3>{translation.title}</h3>

						<p className="description">{translation.description}</p>

						{commonInfo.ticketUrl != null && <BuyTickets url={commonInfo.ticketUrl} language={language} />}
					</div>
				</div>
				{translation.trailerLink !== "" &&
					<div className="video-wrapper">
						<iframe
							src={translation.trailerLink}
							width="640"
							height="360"
							allow="autoplay; fullscreen; picture-in-picture"
							allowFullScreen></iframe>
					</div>}
			</div>

			<hr />
		</div>
	);
};

export default Film;
