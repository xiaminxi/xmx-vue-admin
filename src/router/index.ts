import { createWebHistory, createRouter, } from 'vue-router'
import type { RouteRecordRaw, Router } from "vue-router"
import Layout from "@/layout/index.vue"



// 路由表
export const routes: RouteRecordRaw[] = [
    {
        path: '',
        redirect: '/index',
        component: Layout,
        meta: { title: "首页", icon: "MenuUnfoldOutlined" },
        children: [
            {
                path: 'index',
                name: 'Home',
                component: () => import('@/pages/index.vue') // 示例页面
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        meta: {
            visible: true,
            title: "错误页",
        },
        component: () => import('@/pages/error/404.vue'),
    },
    {
        path: "/login",
        meta: { visible: true, title: "登录页" },
        component: () => import("@/pages/user/login.vue")
    },
    {
        path: "/system",
        meta: { title: "系统管理", icon: "MenuUnfoldOutlined" },
        component: Layout,
        children: [
            {
                path: "menu",
                name: "Menu",
                meta: {
                    title: "菜单管理",
                    icon: "MenuUnfoldOutlined",
                    keepAlive: true
                },
                component: () => import("@/pages/system/index.vue")
            },
            {
                path: "user",
                name: "User",
                meta: {
                    title: "用户管理",
                    icon: "MenuUnfoldOutlined",
                    keepAlive: true
                },
                component: () => import("@/pages/user/index.vue")
            },
            {
                path: "product",
                name: "Product",
                meta: { title: "产品管理" },
                component: () => import("@/pages/product/index.vue")
            },
        ]
    },
    {
        path: "/test5",
        meta: { title: "系统管理", icon: "MenuUnfoldOutlined" },
        component: Layout,
        children: [
            {
                path: "menu",
                name: "test5Menu",
                meta: {
                    title: "菜单管理",
                    icon: "MenuUnfoldOutlined",
                    keepAlive: true
                },
                component: () => import("@/pages/system/index.vue")
            },
            {
                path: "user",
                name: "test5User",
                meta: {
                    title: "用户管理",
                    icon: "MenuUnfoldOutlined",
                    keepAlive: true
                },
                component: () => import("@/pages/user/index.vue")
            },
            {
                path: "product",
                name: "test5Product",
                meta: { title: "产品管理" },
                component: () => import("@/pages/product/index.vue")
            },
        ]
    },
    {
        path: "/test4",
        meta: { title: "系统管理", icon: "MenuUnfoldOutlined" },
        component: Layout,
        children: [
            {
                path: "menu",
                name: "test4Menu",
                meta: {
                    title: "菜单管理",
                    icon: "MenuUnfoldOutlined",
                    keepAlive: true
                },
                component: () => import("@/pages/system/index.vue")
            },
            {
                path: "user",
                name: "test4User",
                meta: {
                    title: "用户管理",
                    icon: "MenuUnfoldOutlined",
                    keepAlive: true
                },
                component: () => import("@/pages/user/index.vue")
            },
            {
                path: "product",
                name: "test4Product",
                meta: { title: "产品管理" },
                component: () => import("@/pages/product/index.vue")
            },
        ]
    },
    {
        path: "/test3",
        meta: { title: "系统管理", icon: "MenuUnfoldOutlined" },
        component: Layout,
        children: [
            {
                path: "menu",
                name: "test3Menu",
                meta: {
                    title: "菜单管理",
                    icon: "MenuUnfoldOutlined",
                    keepAlive: true
                },
                component: () => import("@/pages/system/index.vue")
            },
            {
                path: "user",
                name: "test3User",
                meta: {
                    title: "用户管理",
                    icon: "MenuUnfoldOutlined",
                    keepAlive: true
                },
                component: () => import("@/pages/user/index.vue")
            },
            {
                path: "product",
                name: "test3Product",
                meta: { title: "产品管理" },
                component: () => import("@/pages/product/index.vue")
            },
        ]
    },
    {
        path: "/test2",
        meta: { title: "系统管理", icon: "MenuUnfoldOutlined" },
        component: Layout,
        children: [
            {
                path: "menu",
                name: "test2Menu",
                meta: {
                    title: "菜单管理",
                    icon: "MenuUnfoldOutlined",
                    keepAlive: true
                },
                component: () => import("@/pages/system/index.vue")
            },
            {
                path: "user",
                name: "test2User",
                meta: {
                    title: "用户管理",
                    icon: "MenuUnfoldOutlined",
                    keepAlive: true
                },
                component: () => import("@/pages/user/index.vue")
            },
            {
                path: "product",
                name: "test2Product",
                meta: { title: "产品管理" },
                component: () => import("@/pages/product/index.vue")
            },
        ]
    },
    {
        path: "/test1",
        meta: { title: "系统管理", icon: "MenuUnfoldOutlined" },
        component: Layout,
        children: [
            {
                path: "menu",
                name: "test1Menu",
                meta: {
                    title: "菜单管理",
                    icon: "MenuUnfoldOutlined",
                    keepAlive: true
                },
                component: () => import("@/pages/system/index.vue")
            },
            {
                path: "user",
                name: "test1User",
                meta: {
                    title: "用户管理",
                    icon: "MenuUnfoldOutlined",
                    keepAlive: true
                },
                component: () => import("@/pages/user/index.vue")
            },
            {
                path: "product",
                name: "test1Product",
                meta: { title: "产品管理" },
                component: () => import("@/pages/product/index.vue")
            },
        ]
    },

]


// 创建 router 实例
const router: Router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router
