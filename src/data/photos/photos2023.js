const photos = [
	{ src: "/img/events/2023/0.jpg", width: 1203, height: 802 },
	{ src: "/img/events/2023/1.jpg", width: 964, height: 643 },
	{ src: "/img/events/2023/10.jpg", width: 856, height: 571 },
	{ src: "/img/events/2023/100.jpg", width: 3024, height: 4032 },
	{ src: "/img/events/2023/101.jpg", width: 2736, height: 3441 },
	{ src: "/img/events/2023/102.jpg", width: 4032, height: 2268 },
	{ src: "/img/events/2023/103.jpg", width: 3024, height: 4032 },
	{ src: "/img/events/2023/104.jpg", width: 3024, height: 4032 },
	{ src: "/img/events/2023/105.jpg", width: 3024, height: 4032 },
	{ src: "/img/events/2023/106.jpg", width: 4032, height: 3024 },
	{ src: "/img/events/2023/107.jpg", width: 3024, height: 4032 },
	{ src: "/img/events/2023/108.jpg", width: 2450, height: 3781 },
	{ src: "/img/events/2023/109.jpg", width: 4032, height: 3024 },
	{ src: "/img/events/2023/11.jpg", width: 985, height: 657 },
	{ src: "/img/events/2023/110.jpg", width: 4032, height: 3024 },
	{ src: "/img/events/2023/111.jpg", width: 4032, height: 3024 },
	{ src: "/img/events/2023/112.jpg", width: 3024, height: 4032 },
	{ src: "/img/events/2023/12.jpg", width: 875, height: 586 },
	{ src: "/img/events/2023/13.jpg", width: 1056, height: 709 },
	{ src: "/img/events/2023/14.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/15.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/16.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/17.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/18.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/19.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/2.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/20.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/21.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/22.jpg", width: 460, height: 591 },
	{ src: "/img/events/2023/23.jpg", width: 1028, height: 685 },
	{ src: "/img/events/2023/24.jpg", width: 1052, height: 701 },
	{ src: "/img/events/2023/25.jpg", width: 1148, height: 765 },
	{ src: "/img/events/2023/26.jpg", width: 1080, height: 720 },
	{ src: "/img/events/2023/27.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/28.jpg", width: 550, height: 825 },
	{ src: "/img/events/2023/29.jpg", width: 1075, height: 716 },
	{ src: "/img/events/2023/3.jpg", width: 913, height: 609 },
	{ src: "/img/events/2023/30.jpg", width: 952, height: 635 },
	{ src: "/img/events/2023/31.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/32.jpg", width: 888, height: 592 },
	{ src: "/img/events/2023/33.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/34.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/35.jpg", width: 992, height: 661 },
	{ src: "/img/events/2023/36.jpg", width: 774, height: 516 },
	{ src: "/img/events/2023/37.jpg", width: 914, height: 609 },
	{ src: "/img/events/2023/38.jpg", width: 1096, height: 730 },
	{ src: "/img/events/2023/39.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/4.jpg", width: 1029, height: 686 },
	{ src: "/img/events/2023/40.jpg", width: 546, height: 819 },
	{ src: "/img/events/2023/41.jpg", width: 1119, height: 746 },
	{ src: "/img/events/2023/42.jpg", width: 1093, height: 727 },
	{ src: "/img/events/2023/43.jpg", width: 898, height: 599 },
	{ src: "/img/events/2023/44.jpg", width: 858, height: 572 },
	{ src: "/img/events/2023/45.jpg", width: 1187, height: 792 },
	{ src: "/img/events/2023/46.jpg", width: 1042, height: 693 },
	{ src: "/img/events/2023/47.jpg", width: 362, height: 543 },
	{ src: "/img/events/2023/48.jpg", width: 551, height: 826 },
	{ src: "/img/events/2023/49.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/5.jpg", width: 962, height: 641 },
	{ src: "/img/events/2023/50.jpg", width: 551, height: 826 },
	{ src: "/img/events/2023/51.jpg", width: 732, height: 488 },
	{ src: "/img/events/2023/52.jpg", width: 777, height: 518 },
	{ src: "/img/events/2023/53.jpg", width: 709, height: 473 },
	{ src: "/img/events/2023/54.jpg", width: 413, height: 619 },
	{ src: "/img/events/2023/55.jpg", width: 777, height: 518 },
	{ src: "/img/events/2023/56.jpg", width: 413, height: 619 },
	{ src: "/img/events/2023/57.jpg", width: 312, height: 467 },
	{ src: "/img/events/2023/58.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/59.jpg", width: 709, height: 473 },
	{ src: "/img/events/2023/6.jpg", width: 1134, height: 756 },
	{ src: "/img/events/2023/60.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/61.jpg", width: 859, height: 573 },
	{ src: "/img/events/2023/62.jpg", width: 831, height: 554 },
	{ src: "/img/events/2023/63.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/64.jpg", width: 413, height: 619 },
	{ src: "/img/events/2023/65.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/66.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/67.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/68.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/69.jpg", width: 835, height: 557 },
	{ src: "/img/events/2023/7.jpg", width: 1161, height: 774 },
	{ src: "/img/events/2023/70.jpg", width: 862, height: 575 },
	{ src: "/img/events/2023/71.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/72.jpg", width: 741, height: 494 },
	{ src: "/img/events/2023/73.jpg", width: 285, height: 427 },
	{ src: "/img/events/2023/74.jpg", width: 782, height: 522 },
	{ src: "/img/events/2023/75.jpg", width: 711, height: 474 },
	{ src: "/img/events/2023/76.jpg", width: 600, height: 450 },
	{ src: "/img/events/2023/77.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/78.jpg", width: 849, height: 566 },
	{ src: "/img/events/2023/79.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/8.jpg", width: 1008, height: 673 },
	{ src: "/img/events/2023/80.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/81.jpg", width: 600, height: 450 },
	{ src: "/img/events/2023/82.jpg", width: 600, height: 450 },
	{ src: "/img/events/2023/83.jpg", width: 600, height: 450 },
	{ src: "/img/events/2023/84.jpg", width: 413, height: 619 },
	{ src: "/img/events/2023/85.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/86.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/87.jpg", width: 929, height: 619 },
	{ src: "/img/events/2023/88.jpg", width: 404, height: 607 },
	{ src: "/img/events/2023/89.jpg", width: 771, height: 514 },
	{ src: "/img/events/2023/9.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/90.jpg", width: 349, height: 524 },
	{ src: "/img/events/2023/91.jpg", width: 1238, height: 826 },
	{ src: "/img/events/2023/92.jpg", width: 1011, height: 674 },
	{ src: "/img/events/2023/93.jpg", width: 838, height: 559 },
	{ src: "/img/events/2023/94.jpg", width: 468, height: 701 },
	{ src: "/img/events/2023/95.jpg", width: 3024, height: 4032 },
	{ src: "/img/events/2023/96.jpg", width: 3024, height: 4032 },
	{ src: "/img/events/2023/97.jpg", width: 2805, height: 3976 },
	{ src: "/img/events/2023/98.jpg", width: 3024, height: 4032 },
	{ src: "/img/events/2023/99.jpg", width: 3024, height: 4032 },
];

export default photos;