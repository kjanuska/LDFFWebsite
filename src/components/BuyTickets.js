import translation from "../data/translation.json";

const BuyTickets = ({ url, language }) => {
    const openTicketUrl = () => {
        window.open(url, '_blank', 'noreferrer');
    }

    return (
        <button className="tickets-btn button white" onClick={openTicketUrl}>{translation[language].buyTickets}</button>
    );
};

export default BuyTickets;