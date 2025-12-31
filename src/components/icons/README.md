# CustomIcon 组件使用说明（CustomIcon.vue）

位置：`src/components/icons/CustomIcon.vue`
辅助映射：`src/utils/icon-map.ts`

## 概述

CustomIcon 是一个统一图标组件，用于在项目中统一处理来自不同来源的图标（本地 SVG、Element Plus 图标、iconfont），简化引用并保证样式一致性（大小、颜色、对齐）。

## 功能

- 支持本地 SVG 组件、Element Plus 图标和 iconfont 字体图标三种来源；
- 自动根据 `iconName` 判断图标类型并选择渲染方式；
- 支持 `size` 和 `color` props，默认颜色使用 `var(--color-text)`（项目 tokens）；
- 对 SVG 使用 `fill: currentColor`，方便通过 `color` 或 CSS 变量统一控制；
- 找不到图标时渲染空占位（避免抛错）。

## Props

```ts
interface Props {
  iconName: string // 必需：图标名称
  size?: number | string // 可选：数字（px）或字符串（如 '1.2em'）。默认 20
  color?: string // 可选：颜色字符串（如 '#333' 或 'var(--color-primary)'），默认 'var(--color-text)'
}
```

> 说明：如果传入数字 `size`，组件会将其视为像素（例如 `24` -> `24px`）。

## 基本用法

```vue
<!-- 默认大小和颜色 -->
<CustomIcon iconName="Home" />

<!-- 指定大小和颜色 -->
<CustomIcon iconName="Search" :size="24" color="var(--color-primary)" />

<!-- Element Plus 图标（如在 elIconMap 中存在） -->
<CustomIcon iconName="ArrowLeftBold" />

<!-- iconfont 字体图标（在 fontIconSet 中注册） -->
<CustomIcon iconName="github" />
```

## 样式与定制

- SVG 使用 `currentColor`，因此通过 `color` prop 或 CSS 覆盖 `.custom-icon { color: var(--color-primary); }` 可以统一控制颜色；
- `size` 支持数字或字符串，如果需要响应式大小建议使用 `em`/`rem`。

## 如何添加新图标

编辑 `src/utils/icon-map.ts`：

- 将本地 SVG 组件加入 `svgIconMap['MyIcon'] = MyIconComponent`；
- 或将 Element Plus 图标映射进 `elIconMap['Name'] = IconComponent`；
- 或把 iconfont 名称加入 `fontIconSet`。

添加后即可通过 `<CustomIcon iconName="MyIcon" />` 使用。

## 无障碍 & 最佳实践

- 装饰性图标：加 `aria-hidden="true"`；
- 有语义的图标（表示操作或状态），要提供 `aria-label` 或包裹语义文本；
- 推荐使用项目 design tokens（如 `var(--color-*)`）控制颜色以支持主题切换。

## 常见问题

- 找不到图标：检查 `icon-map.ts` 中是否包含对应 key；组件不会抛出错误，而是渲染空占位以避免 UI 崩溃；
- 颜色不生效：确认 `CustomIcon` 的外层没有覆盖 color，并优先使用 `color` prop 或 CSS 变量。

---

如果你愿意，我可以：

- 1. 把这个文档也写入到 `src/utils/icon-map.ts` 的注释中；
- 2. 添加一个示例（`src/components/icons/demo`）页面展示常用图标用法；
- 3. 或将 `Read.md`（当前空文件）替换成这个内容（如果你希望覆盖）。
     请告诉我你想要哪一项，我会继续处理。
