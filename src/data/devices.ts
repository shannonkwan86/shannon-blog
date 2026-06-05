// 设备数据配置文件

export interface Device {
  name: string;
  image: string;
  specs: string;
  description: string;
  link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = Record<string, Device[]> & {
  自定义?: Device[];
};

export const devicesData: DeviceCategory = {
  电脑: [
    {
      name: "华硕 天选 5 Pro",
      image: "/images/device/asus-tuf-gaming-a15-pro.webp",
      specs: "16GB RAM / 512GB SSD + Kioxia SD10 1TB",
      description:
        "Win本，加装了铠侠 SD10 1TB 固态，用来学习、开发和日常娱乐。",
      link: "https://www.asus.com.cn/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a16-2024/",
    },
    {
      name: "MacBook Air M2",
      image: "/images/device/macbook-air-m2.webp",
      specs: "24GB RAM / 1TB SSD",
      description: "轻薄便携的 macOS 设备，适合移动学习、写作、开发。",
      link: "https://www.apple.com/shop/buy-mac/macbook-air/13-inch-m2",
    },
  ],

  手机: [
    {
      name: "iQOO Neo9S Pro",
      image: "/images/device/iqoo-neo9s-pro.webp",
      specs: "16GB RAM / 512GB Storage",
      description: "当前主力手机，兼顾性能、日常使用和游戏体验。",
      link: "https://www.vivo.com.cn/vivo/iqooneo9spro/",
    },
  ],

  穿戴: [
    {
      name: "vivo WATCH 3",
      image: "/images/device/vivo-watch-3.webp",
      specs: "C6D",
      description: "日常佩戴的智能手表，用于健康记录、通知提醒和运动数据同步。",
      link: "https://www.vivo.com.cn/vivo/vivowatch3/",
    },
  ],

  音频: [
    {
      name: "漫步者 W830NB",
      image: "/images/device/edifier-w830nb.webp",
      specs: "Wireless / ANC",
      description: "日常通勤和学习时使用的头戴式降噪耳机。",
      link: "https://www.edifier.com/cn/product/product-717.html",
    },
    {
      name: "水月雨 竹 2",
      image: "/images/device/moondrop-chu-2.webp",
      specs: "In-ear Monitor",
      description: "有线入耳式耳机，适合安静环境下听歌看视频。",
      link: "https://moondroplab.com/en/products/chu-ii",
    },
  ],

  外设: [
    {
      name: "狼途 T88",
      image: "/images/device/langtu-t88.webp",
      specs: "Mechanical Keyboard",
      description: "来自好兄弟的馈赠，但我似乎更喜欢用自带键盘？",
      link: "https://langtustore.com/en-gb/products/langtu-t88-teclado-mecanico-inalambrico-88-teclas-gaming-bluetooth-2-4g-teclado-con-cable-rgb-hotswap-gamer-teclado-sin-contacto",
    },
    {
      name: "迈从 A7 Pro",
      image: "/images/device/maicong-a7-pro.webp",
      specs: "Wireless Mouse",
      description: "日常使用的无线鼠标，更多在游戏时使用。",
      link: "https://www.mchose.store/da/products/mchose-a7-series-high-end-lightweight-wireless-mouse",
    },
  ],
};
