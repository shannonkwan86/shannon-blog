# CLAUDE.md

## 项目概述

ᯤ³ᴳ Notes (Shannon's Channel) — 个人技术博客，内容以算法竞赛（XCPC/ICPC）题解、算法模板、软件工程学习记录为主。

## 技术栈

- **框架**: Astro 6 + Svelte 5
- **样式**: Tailwind CSS 4
- **内容**: Markdown / MDX，使用 Front Matter CMS 管理 frontmatter
- **数学公式**: KaTeX（`rehype-katex` + `remark-math`）
- **代码高亮**: Expressive Code
- **包管理**: pnpm

## 文章存放

```
src/content/posts/
├── <slug>/          # page bundle 模式 — 每篇文章一个目录
│   ├── index.md     # 文章正文
│   └── cover.webp   # 封面图（可选）
```

**命名规范**:
- slug 使用小写英文 + 连字符，如 `icpc-2024-shanghai`
- 中文标题写在 frontmatter 的 `title` 字段里，不在文件名中
- 如文章不需要封面图，也可以直接用 `<slug>.md`（单文件模式，兼容旧文章）

## Frontmatter 字段

创建新文章时必须包含以下 frontmatter：

```yaml
---
title: "文章标题"              # 必填，字符串
published: 2026-06-27          # 必填，发布日期 YYYY-MM-DD
updated: 2026-06-27            # 可选，最后更新日期
description: "一句话描述"       # 必填，用于 SEO 和列表展示
image: "./cover.webp"          # 可选，封面图路径（相对当前文章目录），无图时可省略
tags: ["标签1", "标签2"]       # 可选，标签列表
category: XCPC                 # 可选，分类：XCPC / Notes / 软工 / 生活 等
draft: false                   # 必填，true 时文章不发布
lang: zh-CN                    # 可选，语言代码，中文文章用 zh-CN
comment: true                  # 可选，是否开启评论，默认 true
---
```

**注意事项**:
- `published` 使用当天日期，格式 `YYYY-MM-DD`
- `tags` 用 YAML 数组格式 `["VP", "题解"]`，不用 `- VP` 多行格式
- `image` 使用相对路径 `"./cover.webp"`，指向文章目录内的封面图
- `lang` 在中文文章中写 `zh-CN`，不写会使用默认值
- 不要添加 frontmatter schema 中不存在的自定义字段

## 写作风格

### 语言和语气
- 中文写作，自然口语化但不随意
- 题解类文章：清晰、结构化，先讲思路再讲实现
- 模板/笔记类：简洁直接，注释用中文

### 格式约定
- 数学公式使用 KaTeX：行内 `$...$`，块级 `$$...$$`
- 代码块必须标注语言：```` ```cpp ````、```` ```bash ```` 等
- 二级标题 `##` 作为章节分隔，三级 `###` 用于子话题
- 题解文章使用表格总览题目状态（见下方模板）

### 题解文章模板

```markdown
## 总览

| 题目 | 状态    | 标签       |
| ---- | ------- | ---------- |
| A    | 0:48 +0 | 标签       |

---

## A. 题目标题

**题意：** 一句话描述题目要求。

**思路：**

1. 分步骤列出解题思路
2. ...

**实现：** 关键实现细节。

**复杂度：** O(...)
```

## 常用命令

| 命令 | 用途 |
|------|------|
| `pnpm dev` | 启动开发服务器（localhost:4321） |
| `pnpm build` | 构建生产版本 |
| `pnpm new-post -- <slug>` | 用脚本创建新文章骨架 |
| `pnpm format` | 格式化代码（biome） |
| `pnpm lint` | 检查和修复代码（biome） |

## 注意事项

- 不要修改 `src/content/posts/` 以外的 Astro 框架文件，除非用户明确要求
- 封面图放在文章目录内（`./cover.webp`），不要使用外部 URL
- 新建文章前先确认 `draft: true`，等用户审核后再改为 `false` 发布
