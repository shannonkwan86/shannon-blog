import type { ProfileConfig } from "../types/config";

// 个人资料配置
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp", // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
	name: "Shannon Kwan",
	bio: "绝对的AP，由此而生的加训，教会你爱的将会是……",
	typewriter: {
		enable: true, // 启用个人简介打字机效果
		speed: 80, // 打字速度（毫秒）
	},
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/shannonkwan86",
		},
		{
			name: "发送邮件",
			icon: "fa7-solid:envelope",
			url: "mailto:3406702953@qq.com",
		},
		{
			name: "复制 QQ：3406702953",
			icon: "fa7-brands:qq",
			copyText: "3406702953",
		},
		// {
		//   name: "Gitee",
		//   icon: "mdi:git",
		//   url: "https://gitee.com/matsuzakayuki",
		// },
		// {
		//   name: "Codeberg",
		//   icon: "simple-icons:codeberg",
		//   url: "https://codeberg.org",
		// },
		// {
		//   name: "Discord",
		//   icon: "fa7-brands:discord",
		//   url: "https://discord.gg/MqW6TcQtVM",
		// },
	],
};
