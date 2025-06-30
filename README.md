# xmx-vue-admin

基于 **Vue 3 + TypeScript + Vite** 构建的企业级后台管理系统模板，轻量快速、模块清晰，适用于中后台系统开发。

## 🚀 技术栈

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) - 状态管理
- [Vue Router](https://router.vuejs.org/) - 路由系统
- [Element Plus](https://element-plus.org/) 或 [Naive UI](https://www.naiveui.com/)（按实际选择的 UI 库）
- [Axios](https://axios-http.com/) - 请求封装

## 📦 快速开始

```bash
pnpm install       # 安装依赖
pnpm dev           # 启动开发环境
pnpm build         # 构建生产环境
```

## 📁 项目结构

```
├── public/                   # 公共静态资源
├── src/
│   ├── assets/               # 静态资源（图片、样式）
│   ├── components/           # 公共组件
│   ├── views/                # 页面视图
│   ├── router/               # 路由配置
│   ├── store/                # Pinia 状态管理
│   ├── utils/                # 工具函数
│   ├── api/                  # 接口模块封装
│   ├── layouts/              # 公共布局组件
│   ├── locales/              # 多语言配置（如果有）
│   └── main.ts               # 应用入口
├── .env*                     # 环境变量配置
├── vite.config.ts            # Vite 配置文件
├── tsconfig.json             # TypeScript 配置
└── README.md
```

## 🌐 环境变量说明

| 文件名              | 描述           |
|---------------------|----------------|
| `.env`              | 默认配置       |
| `.env.development`  | 开发环境配置   |
| `.env.production`   | 生产环境配置   |

示例：

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=XMX 管理后台
```

## ✅ 核心功能

- ✅ 动态菜单加载（支持后端返回菜单结构）
- ✅ 权限控制（基于路由和按钮级别权限）
- ✅ Keep-Alive 缓存页面
- ✅ 多语言支持（可选）
- ✅ 主题切换、黑暗模式（可选）
- ✅ 接口模块化封装
- ✅ 自动引入组件（结合插件配置）

## 🔧 开发规范建议

- 使用 `eslint` + `prettier` 保持统一代码风格
- 使用 `husky` + `lint-staged` 实现提交前自动格式化
- 使用 `commitlint` 统一提交规范

## 🔒 License

MIT © [xiaminxi](https://github.com/xiaminxi)
