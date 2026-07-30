export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
}

export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "Manmu Blog",
		imgurl: "/assets/friends/manmu.ico",
		desc: "Manmu Blog",
		siteurl: "http://blog-manmu.top/",
	},
];
