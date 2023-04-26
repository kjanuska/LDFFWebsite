import { useState, useEffect } from "react";

const SPONSOR_PATH = "/img/logos/sponsors/2023/"

const Sponsors = () => {
    // const [images, setImages] = useState([]);

    // useEffect(() => {
    //     const importAll = (r) => {
    //         let images = {};
    //         r.keys().forEach((item, _) => { images[item.replace('./', '')] = r(item); });
    //         return images
    //     }

    //     const images = importAll(require.context(SPONSOR_PATH, false, /\.(png|jpe?g|svg)$/));
    //     console.log(images);
    // }, []);

    return (
        <div className="container padding-64">
            <h2 className="wide center">SPONSORS</h2>
            <div className="sponsors">
                <img src={`${SPONSOR_PATH}lt_fondas.png`} />
                <img src={`${SPONSOR_PATH}bendroumene.jpg`} />
                <img src={`${SPONSOR_PATH}draugas.jpg`} />
                <img src={`${SPONSOR_PATH}balzekas.jpg`} />
                <img src={`${SPONSOR_PATH}domanskis.JPG`} />
                <img src={`${SPONSOR_PATH}rauduve.png`} />
                <img src={`${SPONSOR_PATH}atlantic.jpg`} />
                <img src={`${SPONSOR_PATH}image001.png`} />
                <img src={`${SPONSOR_PATH}bravo_bites.png`} />
                <img src={`${SPONSOR_PATH}CSCI-Vilnius-Anniversary (1).JPG`} />
            </div>
        </div>
    );
}

export default Sponsors;