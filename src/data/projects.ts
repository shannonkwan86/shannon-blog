export interface Project {
	id: string;
	title: string;
	description: string;
	image?: string;
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	showStatus?: boolean;
	liveDemo?: string;
	sourceCode?: string;
	visitUrl?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	showImage?: boolean;
}

export const projectsData: Project[] = [
	{
		id: "go-torrent-client",
		title: "go-torrent-client",
		description:
			"一个用 Go 编写的精简 BitTorrent 下载客户端，用于学习协议解析、网络并发与分块下载。",
		techStack: ["Go", "BitTorrent", "TCP"],
		status: "in-progress",
		showStatus: false,
		sourceCode: "https://github.com/shannonkwan86/go-torrent-client",
		startDate: "2026-07-01",
		featured: true,
		showImage: false,
	},
];

export const getProjectStats = () => ({
	total: projectsData.length,
	byStatus: {
		completed: projectsData.filter((project) => project.status === "completed")
			.length,
		inProgress: projectsData.filter((project) => project.status === "in-progress")
			.length,
		planned: projectsData.filter((project) => project.status === "planned").length,
	},
});

export const getFeaturedProjects = () =>
	projectsData.filter((project) => project.featured);

export const getAllTechStack = () =>
	Array.from(new Set(projectsData.flatMap((project) => project.techStack))).sort();
