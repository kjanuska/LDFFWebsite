import addresses from "../data/addresses.json";

const IMAGE_PATH = "/img/posters/";

const Film = ({ translation, commonInfo, language }) => {
	return (
		<div>
			{commonInfo.events.map((event) => {
				const address = addresses[event.address];
				const date = new Date(event.date);
				const options = {
					month: "long",
					day: "numeric",
				};

				return (
					<div key={event.date}>
						<h4>{date.toLocaleDateString(language, options)}</h4>
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
					<img className="poster" src={`${IMAGE_PATH}${commonInfo.posterName}`} />
					<div className="film-text">
						<h3>{translation.title}</h3>

						<p>{translation.description}</p>
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
