// js/main.js
import { Home } from './views/Home.js';
import { BlogList } from './views/BlogList.js';
import { BlogPost } from './views/BlogPost.js';
import { About } from './views/About.js';

// 注意：Vue 和 Vue Router 是通过 CDN 在 index.html 中引入的全局变量
const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// --- 路由配置 ---
const routes = [
    { path: '/', component: Home },
    { path: '/blog', component: BlogList },
    { path: '/blog/:id', component: BlogPost, props: true }, // 动态路由，传递 id
    { path: '/about', component: About }
];

const router = createRouter({
    history: createWebHashHistory(), // 使用 Hash 模式以适应简单的文件服务器
    routes
});

// --- 创建并挂载 Vue 应用 ---
const app = createApp({});
app.use(router);
app.mount('#app');

console.log('Modular Vue blog app initialized successfully.');
