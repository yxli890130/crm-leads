<p align="center">
  <br>
  <img src="https://img.shields.io/badge/Next.js-16.2.9-black?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss" alt="Tailwind CSS">
</p>

---

# 📋 CRM Leads Management System / 客户线索管理系统

<p align="center">
  <b>中文</b> · <a href="#english">English</a>
</p>

---

<a id="chinese"></a>

# 🀄 客户线索管理系统

基于 **Next.js 16** 构建的全栈单体 CRM 系统，专注于客户线索管理。采用 JSON 文件存储数据，无需数据库，适合初学者学习和二次开发。

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Next.js 16.2.9 (App Router) |
| **语言** | TypeScript 5 |
| **样式** | Tailwind CSS v4 |
| **数据存储** | JSON 文件 (`data/leads.json`) — 通过 Node.js `fs` 模块读写 |
| **API** | Next.js Route Handlers (`/api/leads`) |
| **字体** | Geist (Vercel 官方字体) |

## 📁 项目结构

```
crm-leads/
├── data/
│   └── leads.json               # 线索数据文件
├── src/
│   ├── app/
│   │   ├── api/leads/route.ts   # RESTful API (GET/POST/PUT/DELETE)
│   │   ├── globals.css          # 全局样式
│   │   ├── layout.tsx           # 根布局
│   │   └── page.tsx             # 主页面（状态管理中心）
│   ├── components/
│   │   ├── Sidebar.tsx          # 左侧导航栏
│   │   ├── FilterBar.tsx        # 顶部筛选条件栏
│   │   ├── LeadTable.tsx        # 线索列表表格
│   │   ├── AddLeadModal.tsx     # 新增线索弹窗
│   │   ├── DeleteConfirm.tsx    # 删除确认弹窗
│   │   ├── LeadDetailDrawer.tsx # 右侧详情抽屉
│   │   └── LeadEditDrawer.tsx   # 右侧修改抽屉
│   └── types/
│       └── lead.ts              # TypeScript 类型定义
```

## ✅ 已完成功能

| 功能 | 交互方式 | 说明 |
|------|---------|------|
| **筛选条件** | 创建时间（日期范围）、姓名、电话、客户来源、优先级 + 查询按钮 | 支持组合筛选，实时查询 |
| **新增线索** | 右上角「新增线索」按钮 → 弹窗填写信息 → 确认添加 | 字段：姓名、电话、优先级、客户来源、跟进人 |
| **查看详情** | 操作区「详情」按钮 → 右侧抽屉展示完整线索信息 | 显示所有字段，含编号和优先级标签 |
| **修改线索** | 操作区「修改」按钮 → 右侧抽屉编辑表单 → 保存 | 可修改姓名、电话、优先级、来源、跟进人 |
| **删除线索** | 操作区「删除」按钮 → 中间确认弹窗 → 确认删除 | 二次确认，防止误操作 |
| **RESTful API** | `/api/leads` 端点 | 支持 GET（含筛选参数）、POST、PUT、DELETE |

## 📋 待实现功能

- [ ] 分页功能
- [ ] 线索全选 / 批量操作
- [ ] 客户管理页面
- [ ] 订单管理页面
- [ ] 数据导出 (CSV / Excel)
- [ ] 用户登录 / 权限管理

## 🚀 快速开始

### 前置条件

- Node.js 18+（推荐 20+）
- npm 9+

### 安装 & 运行

```bash
# 克隆仓库
git clone https://github.com/yxli890130/crm-leads.git
cd crm-leads

# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:3000）
npm run dev
```

### 构建 & 部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 📄 数据说明

所有线索数据存储在 `data/leads.json` 文件中，包含 **12 条模拟数据**：

- 无需配置数据库，开箱即用
- JSON 格式一目了然，方便初学者直接修改测试
- 后续可无缝迁移到 MySQL / PostgreSQL / MongoDB 等数据库

数据文件结构示例：

```json
[
  {
    "id": "LD-2026-0001",
    "createdAt": "2026-06-10",
    "name": "王建国",
    "phone": "138****5678",
    "priority": "high",
    "source": "官网",
    "follower": "张经理"
  }
]
```

## 📸 页面预览

| 模块 | 预览 |
|------|------|
| **筛选栏** | 创建时间（日期范围）+ 姓名 + 电话 + 客户来源 + 优先级 + 查询按钮 |
| **线索列表** | 线索编号、创建时间、姓名、电话、优先级标签、客户来源、跟进人 |
| **操作区** | 详情（右侧抽屉）/ 修改（右侧抽屉）/ 删除（确认弹窗） |
| **新增线索** | 居中弹窗表单，含姓名、电话、优先级、客户来源、跟进人 |

## 🧱 技术架构

```
客户端 (React 19)          服务端 (Next.js 16)         数据层
     │                          │                        │
     │  fetch /api/leads        │                        │
     ├────────────────────────►  │  fs.readFileSync()    │
     │                          ├────────────────────►   │
     │                          │    data/leads.json     │
     │  ◄──── JSON ──────────── ├────────────────────    │
     │                          │                        │
  page.tsx                route.ts                JSON 文件
  (状态管理)               (API 处理器)             (持久化)
```

---

---

<a id="english"></a>

# 🇬🇧 CRM Leads Management System

A full-stack monolithic CRM system built with **Next.js 16**, focused on customer lead management. Data is stored in JSON files — no database required, making it ideal for learning and rapid prototyping.

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.2.9 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **Data Storage** | JSON file (`data/leads.json`) — read/written via Node.js `fs` module |
| **API** | Next.js Route Handlers (`/api/leads`) |
| **Font** | Geist (Vercel's official typeface) |

## 📁 Project Structure

```
crm-leads/
├── data/
│   └── leads.json               # Lead data file
├── src/
│   ├── app/
│   │   ├── api/leads/route.ts   # RESTful API (GET/POST/PUT/DELETE)
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Main page (state management center)
│   ├── components/
│   │   ├── Sidebar.tsx          # Left sidebar navigation
│   │   ├── FilterBar.tsx        # Filter bar (date, name, phone, etc.)
│   │   ├── LeadTable.tsx        # Leads data table
│   │   ├── AddLeadModal.tsx     # Add lead modal dialog
│   │   ├── DeleteConfirm.tsx    # Delete confirmation dialog
│   │   ├── LeadDetailDrawer.tsx # Right-side detail drawer
│   │   └── LeadEditDrawer.tsx   # Right-side edit drawer
│   └── types/
│       └── lead.ts              # TypeScript type definitions
```

## ✅ Implemented Features

| Feature | Interaction | Description |
|---------|-------------|-------------|
| **Filters** | Date range, name, phone, source, priority + Search button | Combined filtering with real-time query |
| **Add Lead** | 「Add Lead」button → modal form → confirm | Fields: name, phone, priority, source, follower |
| **View Details** | 「Detail」button → right drawer with full info | Shows all fields with ID and priority badge |
| **Edit Lead** | 「Edit」button → right drawer form → save | Edit name, phone, priority, source, follower |
| **Delete Lead** | 「Delete」button → center confirmation → confirm | Double confirmation to prevent accidents |
| **RESTful API** | `/api/leads` endpoint | Supports GET (with filter params), POST, PUT, DELETE |

## 📋 Upcoming Features

- [ ] Pagination
- [ ] Select-all / Batch operations
- [ ] Customer management page
- [ ] Order management page
- [ ] Data export (CSV / Excel)
- [ ] User authentication / Role-based access

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm 9+

### Install & Run

```bash
# Clone the repository
git clone https://github.com/yxli890130/crm-leads.git
cd crm-leads

# Install dependencies
npm install

# Start dev server (default http://localhost:3000)
npm run dev
```

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📄 Data

All lead data is stored in `data/leads.json` with **12 mock records**:

- Zero database configuration — works out of the box
- Plain JSON format, easy for beginners to read and modify
- Can be seamlessly migrated to MySQL / PostgreSQL / MongoDB later

Sample data structure:

```json
[
  {
    "id": "LD-2026-0001",
    "createdAt": "2026-06-10",
    "name": "Wang Jianguo",
    "phone": "138****5678",
    "priority": "high",
    "source": "Website",
    "follower": "Manager Zhang"
  }
]
```

## 🧱 Architecture

```
Client (React 19)              Server (Next.js 16)          Data Layer
     │                              │                          │
     │  fetch /api/leads            │                          │
     ├─────────────────────────────►│   fs.readFileSync()      │
     │                              ├─────────────────────────►│
     │                              │     data/leads.json      │
     │  ◄──── JSON ────────────────├────────────────────────── │
     │                              │                          │
  page.tsx                    route.ts                    JSON File
  (state mgmt)                (API handler)               (persistence)
```

---

<p align="center">
  Made with ❤️ using Next.js · TypeScript · Tailwind CSS
</p>
