# React 16 性能优化 Demo

> React 16 版本的性能优化示例项目，展示常见的性能问题和优化方案

## 📖 项目说明

本项目是 **React 16 vs React 19 性能对比系列**的一部分，专注于展示 React 16 的特性、限制以及传统的性能优化方法。

## 🎯 Demo 列表

### 基础优化篇

- **Demo A**: Render 瓶颈定位与优化
  - 未优化：2000 个列表项全量渲染
  - 优化：React.memo + 虚拟化滚动
  - 性能提升：渲染时间减少 90%

- **Demo B**: Code Splitting 与懒加载
  - 未优化：首屏加载所有路由组件
  - 优化：React.lazy + Suspense 按需加载
  - 性能提升：首屏 Bundle 减少 70%

- **Demo C**: 计算密集型任务优化
  - 场景 1：大数据处理（Web Worker）
  - 场景 2：文本搜索（Web Worker）
  - 性能提升：主线程占用减少 90%

### React 16 特性展示

- **Demo D**: 批处理问题
  - 问题：setTimeout/Promise 中多次 setState 触发多次渲染
  - 现象：3 次状态更新 = 3 次渲染

- **Demo E**: 输入卡顿问题
  - 问题：所有更新同等优先级，无法区分紧急程度
  - 现象：输入响应延迟 200-500ms

- **Demo F**: Suspense 基础支持
  - 支持：React.lazy 代码分割
  - 限制：不支持数据加载、SSR 流式渲染

- **Demo G**: 入口 API 与 StrictMode
  - API：ReactDOM.render
  - StrictMode：Effect 执行 1 次

- **Demo H**: 手动优化
  - 需要：手动添加 memo/useMemo/useCallback
  - 问题：容易遗漏，代码冗余

- **Demo I**: forwardRef 包装
  - 需要：使用 forwardRef 转发 ref
  - 问题：代码繁琐，类型复杂

- **Demo J**: 手动管理异步状态
  - 需要：手动管理 loading/error/data 三个状态
  - 问题：代码量大（~15 行）

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 🛠️ 技术栈

- **React**: 16.14.0
- **构建工具**: Vite
- **样式**: Less
- **性能分析**: React Profiler

## 📊 性能优化要点

### 1. 使用 React.memo

```jsx
const ListItem = React.memo(({ item }) => {
  return <div>{item.name}</div>;
});
```

### 2. 使用 useMemo 缓存计算

```jsx
const expensiveValue = useMemo(() => {
  return heavyComputation(data);
}, [data]);
```

### 3. 使用 useCallback 缓存函数

```jsx
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

### 4. 虚拟化长列表

只渲染可见区域的元素，减少 DOM 节点数量。

### 5. 代码分割

使用 React.lazy 和 Suspense 实现路由懒加载。

### 6. Web Worker

将计算密集型任务移到后台线程。

## 🔍 使用 Profiler 分析性能

项目中已集成 React Profiler，打开浏览器控制台可以看到性能日志：

```
[Profiler] UnoptimizedList - mount 阶段耗时: 523.45ms
[Profiler] OptimizedList - mount 阶段耗时: 52.31ms
```

## 📝 React 16 的限制

1. **批处理限制**：仅在事件处理器中自动批处理
2. **无并发渲染**：所有更新同等优先级
3. **Suspense 限制**：仅支持代码分割
4. **SSR 限制**：renderToString 同步渲染
5. **手动优化**：需要手动添加性能优化代码
6. **ref 转发**：需要 forwardRef 包装

## 🔗 相关项目

- [React 16 性能优化 Demo](https://github.com/wenshilin0615/react-performance-demo) - 对比项目
- [培训文档](../React进阶与性能优化培训文档.md)

## 📚 学习资源

- [React 官方文档](https://react.dev)
- [React Profiler API](https://react.dev/reference/react/Profiler)
- [性能优化指南](https://react.dev/learn/render-and-commit)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT

---

**注意**：本项目用于教学和演示目的，展示 React 16 的特性和限制。生产环境建议使用 React 18+ 版本。
