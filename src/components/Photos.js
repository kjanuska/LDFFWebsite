import PhotoAlbum from "react-photo-album";
import { useState } from "react";

const photos = [
	{ src: "/img/events/2022/0.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/1.jpg", width: 2048, height: 1365 },
	{ src: "/img/events/2022/10.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/11.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/12.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/13.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/14.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/15.jpg", width: 2048, height: 1060 },
	{ src: "/img/events/2022/16.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/17.jpg", width: 2048, height: 1365 },
	{ src: "/img/events/2022/18.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/19.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/2.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/20.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/21.jpg", width: 2048, height: 1365 },
	{ src: "/img/events/2022/22.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/23.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/24.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/25.jpg", width: 2048, height: 1365 },
	{ src: "/img/events/2022/26.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/27.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/28.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/29.jpg", width: 2048, height: 1365 },
	{ src: "/img/events/2022/3.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/30.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/31.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/4.jpg", width: 1365, height: 2048 },
	{ src: "/img/events/2022/5.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/6.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/7.jpg", width: 2048, height: 1367 },
	{ src: "/img/events/2022/8.jpg", width: 2048, height: 1366 },
	{ src: "/img/events/2022/9.jpg", width: 2048, height: 1366 },
];

const Photos = () => {
	const [year, setYear] = useState(2022);

	return <PhotoAlbum layout="masonry" photos={photos} />;
};

export default Photos;