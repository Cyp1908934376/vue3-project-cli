# Style Tokens (Design Tokens) Guide

## 目标

将全局样式（颜色、间距、半径、阴影、边框等）统一为一套 `tokens.css`，并在项目中统一引用。

## 文件位置

- `src/styles/tokens.css`：设计 tokens 定义（CSS 变量）
- `src/styles/global.css`：全局重置与基础样式

## 命名约定（简要）

- 颜色：`--color-primary`, `--color-text`, `--color-muted` 等
- 表面（surface）：`--surface-0`（背景）、`--surface-1`（卡片）、`--surface-2`（侧栏）
- 间距：`--space-1`..`--space-5`
- 其他：`--radius-base`, `--shadow-sm`, `--color-border`

## 使用方式

组件样式中使用：

```css
background: var(--surface-2);
border: 1px solid var(--color-border);
```

## 主题切换

通过设置 `data-theme="dark"` 在根元素上来切换深色主题。

我们还提供了一个小工具 `src/utils/theme.ts`：

- `initTheme()`：应用启动时初始化主题（读取 `localStorage` 或 `prefers-color-scheme`）。
- `setTheme('dark' | 'light')`：手动切换主题并保存到 `localStorage`。
- `toggleTheme()`：切换当前主题。

`main.ts` 已调用 `initTheme()` 来在应用启动时自动设置主题。

## 迁移建议

1. 先为核心 Layout、Header、Sidebar、Button 使用 tokens，作为示例 PR。
2. 批量查找硬编码颜色并替换（手动审查）。
3. 在 PR 模板或代码检查中加入样式审查项。

## 常见问题

- Q: 我如何新增 token？
  A: 在 `tokens.css` 中添加变量并在 `docs/STYLE_TOKENS.md` 中说明用途。

---
