import addresses from "../data/addresses.json";
import BuyTickets from "./BuyTickets";

const IMAGE_PATH = "/img/posters/";

const Film = ({ translation, commonInfo, language, year }) => {
	return (
		<div style={{ marginTop: "30px"}}>
			{commonInfo.events.map((event) => {
				const address = addresses[event.address];
				const date = new Date(event.date + (60 * 60 * 1000));
				const options = {
					month: "long",
					day: "numeric",
				};

				const timeOptions = {
					hour: 'numeric',
					minute:'numeric'
				}

				return (
					<div key={event.date}>
						<h4>{`${date.toLocaleDateString(language, options)}, ${date.toLocaleTimeString(language, timeOptions)}`}</h4>
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
					<img className="poster" src={`${IMAGE_PATH}${year}/${commonInfo.posterName}`} />
					<div className="film-text">
						<h3>{translation.title}</h3>

						<p>{translation.description}</p>

						{commonInfo.ticketUrl != null && <BuyTickets url={commonInfo.ticketUrl} language={language}/>}
					</div>
				</div>
				<div className="video-wrapper">
					<iframe
						src={commonInfo.trailerLink}
						width="640"
						height="360"
						allow="autoplay; fullscreen; picture-in-picture"
						allowFullScreen></iframe>
				</div>
			</div>

			<hr />
		</div>
	);
};

export default Film;