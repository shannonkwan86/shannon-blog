# AGENTS.md

## 项目概况

- 这是一个使用 Astro、Svelte、TypeScript 和 pnpm 的 Mizuki 博客项目。
- 页面和组件主要位于 `src/`；项目说明和内容约定位于 `docs/`。
- 内容可能通过独立仓库同步到 `content/`，详见 `docs/CONTENT_REPOSITORY.md` 和 `docs/CONTENT_SEPARATION.md`。

## 给 Codex 的 Git 学习规则

> AGENTS.md: 在做任何 git 操作之前，都逐个文件检查变化，并为我（新手）解释是否符合 best practice，为什么，以及相关的概念。

每次准备执行 Git 操作时，先按文件检查工作区状态：

1. 运行 `git status --short`，说明每个新增、修改、删除或未跟踪文件的含义。
2. 对相关文件运行 `git diff -- <file>`；暂存区不为空时同时运行 `git diff --cached -- <file>`。
3. 解释变化属于工作区、暂存区、提交、分支还是远程仓库，并说明下一步操作的目的。
4. 涉及 `git add`、`git commit`、`git push`、`git reset`、`git checkout`、`git restore`、`git rebase` 或删除操作时，先说明影响、可逆性和适用的 best practice。
5. 不把生成文件、密钥、`.env`、依赖目录或独立内容仓库的内部变化误加入本项目提交。
6. 用户明确要求 Git 操作时可以继续执行；仍然要先完成上述检查并给出简短解释。

## 开发约定

- 使用 `pnpm`，不要混用 npm、Yarn 或 Bun。
- 修改代码后优先运行 `pnpm run check`；TypeScript 类型检查可运行 `pnpm run type-check`。
- `pnpm run lint` 和 `pnpm run format` 带有 `--write`，会修改文件；运行后必须重新检查 diff。
- `pnpm run dev` 和 `pnpm run build` 会触发内容同步。`scripts/sync-content.js` 可能执行 `stash`、`fetch`、分支切换和 `reset --hard`，运行前先确认内容仓库状态及环境变量。
- `pnpm run build` 还会更新动漫数据、生成 Pagefind 索引并压缩字体；除非任务需要，不要用它作为轻量验证命令。
- 内容文章遵循 `docs/CONTENT_AUTHORING.md`；分类使用项目当前定义的分类，标签使用具体主题且通常控制在 0–3 个。

## 修改和验证

- 先阅读相关文件和文档，再修改；保持变更范围最小，不做无关重构或全仓格式化。
- 完成后报告修改的文件、原因、运行过的验证命令及结果。
- 如果命令会联网、写入独立仓库、覆盖本地修改或产生不可逆影响，先明确说明风险。
