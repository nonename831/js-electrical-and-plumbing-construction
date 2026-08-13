# JS 家陞电器水喉工程

新山 (Johor Bahru) 电器与水喉维修服务的营销网站。基于 React + TypeScript + Vite 构建，支持中/英双语切换，部署到 GitHub Pages。

## 技术栈

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- Tailwind CSS（通过 PostCSS 构建，见 `tailwind.config.js`）
- [lucide-react](https://lucide.dev/) 图标

## 本地开发

**环境要求：** Node.js

```bash
npm install
npm run dev
```

## 构建与部署

```bash
npm run build    # 产物输出到 dist/
npm run preview  # 本地预览构建产物
npm run deploy   # 构建并发布到 GitHub Pages (gh-pages 分支)
```

## 目录结构

```
public/          静态资源，原样复制到构建产物（图片、favicon、robots.txt、sitemap.xml、404 页面）
src/
  components/    页面区块组件
  contexts/      语言切换 Context
  hooks/         共享 hooks
  App.tsx        应用根组件
  main.tsx       入口文件
  constants.tsx  联系方式与双语文案
  types.ts       共享类型定义
```
