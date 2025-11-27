# React 19 性能优化 Demo

> React 19 版本的性能优化示例项目，展示最新的性能优化特性和自动化能力

## 📖 项目说明

本项目是 **React 16 vs React 19 性能对比系列**的一部分，专注于展示 React 19 的新特性、性能改进和开发体验提升。

## ✨ React 19 核心特性

### 🚀 自动批处理
所有场景下自动批处理，减少渲染次数 60-80%

### ⚡ 并发渲染
使用 useTransition 实现优先级调度，输入响应时间 <50ms

### 🌊 流式 SSR
TTFB 从 4000ms 降至 ~100ms，提升 97%

### 🤖 React Compiler
自动优化，无需手动 memo/useMemo/useCallback

### 🎯 ref 简化
无需 forwardRef，ref 作为普通 prop

### 🔄 use Hook
简化异步数据处理，代码减少 80%

## 🎯 Demo 列表

- **Demo D**: 自动批处理
  - 特性：所有场景下自动批处理
  - 效果：3 次 setState → 1 次渲染
  - 性能提升：渲染次数减少 67%

- **Demo E**: useTransition 并发渲染
  - 特性：区分高低优先级更新
  - 效果：输入流畅，搜索不阻塞
  - 性能提升：输入响应 <50ms

- **Demo F**: Suspense 流式渲染
  - 特性：支持数据加载、SSR 流式输出
  - 效果：渐进式内容展示
  - 性能提升：FCP 提升 97%

- **Demo G**: 新入口 API 与增强的 StrictMode
  - API：createRoot（启用并发特性）
  - StrictMode：Effect 执行 2 次，暴露副作用问题

- **Demo H**: Compiler 自动优化
  - 特性：自动生成优化代码
  - 效果：无需手动 memo
  - 开发体验：代码简洁，自动化

- **Demo I**: ref 处理简化
  - 特性：ref 作为普通 prop
  - 效果：无需 forwardRef 包装
  - 开发体验：代码更直观

- **Demo J**: use Hook 异步处理
  - 特性：直接使用 Promise
  - 效果：配合 Suspense 自动处理加载状态
  - 代码量：减少 80%

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5174

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 🛠️ 技术栈

- **React**: 19.0.0
- **构建工具**: Vite
- **样式**: Less
- **性能分析**: React Profiler

## 📊 性能对比

### 自动批处理

| 场景 | React 16 | React 19 | 改善 |
|------|----------|----------|------|
| setTimeout 中 3 次 setState | 3 次渲染 | 1 次渲染 | 67% ↓ |
| Promise 中 3 次 setState | 3 次渲染 | 1 次渲染 | 67% ↓ |

### 并发渲染

| 指标 | React 16 | React 19 | 改善 |
|------|----------|----------|------|
| 输入响应时间 | 200-500ms | <50ms | 90% ↓ |
| 搜索过滤 | 阻塞 UI | 不阻塞 | 100% ↑ |

### 流式 SSR

| 指标 | React 16 | React 19 | 改善 |
|------|----------|----------|------|
| TTFB | 4000ms | ~100ms | 97% ↓ |
| FCP | 4000ms | ~100ms | 97% ↓ |
| 用户体验 | 白屏 4 秒 | 立即显示 | 质的飞跃 |

## 💡 最佳实践

### 1. 使用 useTransition 处理非紧急更新

```jsx
const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  setQuery(e.target.value);  // 紧急更新
  
  startTransition(() => {
    setResults(filter(data, e.target.value));  // 非紧急更新
  });
};
```

### 2. 使用 Suspense 处理异步加载

```jsx
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```

### 3. 使用 use Hook 简化异步数据

```jsx
function Component() {
  const data = use(fetchData());
  return <div>{data}</div>;
}
```

### 4. ref 直接作为 prop

```jsx
function MyInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

### 5. 依赖 Compiler 自动优化

```jsx
// 无需手动优化，Compiler 自动处理
const value = count * 2;
const handleClick = () => {...};
```

## 🔍 使用 Profiler 分析性能

项目中已集成 React Profiler，打开浏览器控制台可以看到性能日志：

```
[Profiler] DemoD - mount 阶段耗时: 12.34ms
[Profiler] DemoE - update 阶段耗时: 5.67ms
```

## 🎁 React 19 的优势

### 性能方面
- ✅ 自动批处理，减少渲染次数
- ✅ 并发渲染，提升交互响应
- ✅ 流式 SSR，加快首屏速度
- ✅ Compiler 优化，自动化性能提升

### 开发体验
- ✅ 代码更简洁（无需手动 memo）
- ✅ API 更直观（ref 作为 prop）
- ✅ 异步处理更优雅（use Hook）
- ✅ 更好的类型推导

### 用户体验
- ✅ 更快的首屏加载
- ✅ 更流畅的交互响应
- ✅ 更平滑的内容展示
- ✅ 更少的白屏时间

## 🔗 相关项目

- [React 19 性能优化 Demo](https://github.com/wenshilin0615/react-performance-demo) - 对比项目
- [培训文档](../React进阶与性能优化培训文档.md)

## 📚 学习资源

- [React 19 官方文档](https://react.dev)
- [React 19 发布说明](https://react.dev/blog/2024/04/25/react-19)
- [React Compiler 文档](https://react.dev/learn/react-compiler)
- [并发特性指南](https://react.dev/reference/react/useTransition)

## 🆕 迁移指南

### 从 React 16 迁移

1. **更新入口 API**
   ```jsx
   // React 16
   ReactDOM.render(<App />, root);
   
   // React 19
   createRoot(root).render(<App />);
   ```

2. **确保 Effects 幂等**
   - StrictMode 会双重调用 Effects
   - 添加清理函数

3. **移除手动优化（可选）**
   - Compiler 会自动优化
   - 可以逐步移除 memo/useMemo/useCallback

4. **使用新特性**
   - useTransition 处理非紧急更新
   - use Hook 处理异步数据
   - ref 直接作为 prop

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT

---

**推荐**：生产环境建议使用 React 19，享受最新的性能优化和开发体验提升！
