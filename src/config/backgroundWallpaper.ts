import type { FullscreenWallpaperConfig } from "../types/config";

export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
	// The site uses one fixed Banner per breakpoint. Disabling alternate
	// wallpaper modes prevents browser-local preferences from changing it.
	enable: false,
	src: {
		desktop: "/assets/desktop-banner/2.webp?v=2",
		mobile: "/assets/mobile-banner/shannon-mobile.webp?v=2",
	},
	position: "center",
	carousel: {
		enable: false,
		interval: 5,
	},
	zIndex: -1,
	opacity: 0.8,
	blur: 1,
	switchable: false,
	overlay: {
		opacity: 0.8, // 壁纸不透明度，0-1
		blur: 1.5, // 背景模糊半径（px）
		cardOpacity: 0.8, // 卡片不透明度，0-1
		switchable: {
			opacity: true,
			blur: true,
			cardOpacity: true,
		},
	},
	fullscreen: {
		switchable: {
			opacity: true,
			blur: true,
		},
	},
};
