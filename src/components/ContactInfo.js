const ContactInfo = () => {
	return (
		<div className="black container padding-64" id="contact">
			<h2 className="wide center">CONTACT</h2>
			<div className="contact">
				<div className="contact-info">
					<i className="fa fa-phone" style={{"width": "20px"}}></i>+1 (312) 375-2728
				</div>
				<div className="contact-info">
					<a href="mailto:ltdocfestival@gmail.com">
						<i className="fa fa-envelope hover-opacity" style={{"width" : "20px"}}></i>
						ltdocfestival@gmail.com
					</a>
				</div>

				<div className="contact-info">
					<a
						href="https://www.facebook.com/Lithuanian-Documentary-Film-Festival-LDFF-2326005537613261"
						target="_blank">
						<i className="fa fa-facebook-official hover-opacity" style={{"width": "15px"}}></i>
						LDFF Festival
					</a>
				</div>
			</div>
		</div>
	);
};

export default ContactInfo;
