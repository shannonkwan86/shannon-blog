// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
  id: number;
  title: string;
  group: "Friends" | "OJs" | "Wikis" | "Tools";
  imgurl: string;
  desc: string;
  siteurl: string;
  tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
  {
    id: 1,
    title: "Codeforces",
    group: "OJs",
    imgurl: "https://codeforces.org/s/0/favicon-32x32.png",
    desc: "Codeforces在线编程竞赛平台网站，最权威的猜猜题大赛",
    siteurl: "https://codeforces.com/",
    tags: ["OJ", "Contest"],
  },
  {
    id: 2,
    title: "OI Wiki",
    group: "Wikis",
    imgurl: "https://oi-wiki.org/favicon.ico",
    desc: "算法竞赛知识整理与参考资料。",
    siteurl: "https://oi-wiki.org",
    tags: ["Wiki", "Algorithm"],
  },
  {
    id: 3,
    title: "牛客竞赛",
    group: "OJs",
    imgurl: "https://www.nowcoder.com/favicon.ico",
    desc: "哦耶，牛牛的客。",
    siteurl: "https://ac.nowcoder.com/acm/contest/vip-index",
    tags: ["OJ", "Contest"],
  },
  {
    id: 4,
    title: "AtCoder",
    group: "OJs",
    imgurl: "https://img.atcoder.jp/assets/favicon.png",
    desc: "日本知名算法竞赛平台，题目质量高，适合日常训练。",
    siteurl: "https://atcoder.jp",
    tags: ["OJ", "Contest"],
  },
  {
    id: 5,
    title: "Virtual Judge",
    group: "OJs",
    imgurl: "https://vjudge.net/favicon.ico",
    desc: "聚合多个 OJ 的训练平台，常用于组题、补题和虚拟赛。",
    siteurl: "https://vjudge.net",
    tags: ["OJ"],
  },
  {
    id: 6,
    title: "CS 自学指南",
    group: "Wikis",
    imgurl: "https://csdiy.wiki/images/favicon.ico",
    desc: "计算机科学自学路线与优质课程资源整理。",
    siteurl: "https://csdiy.wiki/",
    tags: ["CS", "Wiki"],
  },
  {
    id: 7,
    title: "洛谷",
    group: "OJs",
    imgurl: "https://www.luogu.com.cn/favicon.ico",
    desc: "学算法模版，适合刷题、训练。",
    siteurl: "https://www.luogu.com.cn/",
    tags: ["OJ"],
  },
  {
    id: 8,
    title: "QOJ",
    group: "OJs",
    imgurl:
      "https://raw.githubusercontent.com/UniversalOJ/UOJ-System/master/web/images/favicon.ico",
    desc: "ICPC区域赛题目合集。",
    siteurl: "https://qoj.ac/",
    tags: ["OJ"],
  },
  {
    id: 9,
    title: "Manmu Blog",
    group: "Friends",
    imgurl: "http://blog-manmu.top/favicon/favicon.ico",
    desc: "Manmu Blog",
    siteurl: "http://blog-manmu.top/",
    tags: ["Blog", "Friend"],
  },
];

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
  return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
  const shuffled = [...friendsData];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getGroupedFriendsList(): [FriendItem["group"], FriendItem[]][] {
  const groupOrder: FriendItem["group"][] = [
    "Friends",
    "OJs",
    "Wikis",
    "Tools",
  ];

  return groupOrder
    .map(
      (group) =>
        [group, friendsData.filter((item) => item.group === group)] as [
          FriendItem["group"],
          FriendItem[],
        ],
    )
    .filter(([, items]) => items.length > 0);
}
