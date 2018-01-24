import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '主页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/users',
    name: '管理员管理',
    meta: { title: '管理员管理', icon: 'example' },
    children: [
      {
        path: 'users',
        name: '管理员列表',
        component: () => import('@/views/admin/users'),
        meta: { title: '管理员列表', icon: 'table' }
      }, {
        path: 'user_add',
        name: '新增管理员',
        component: () => import('@/views/admin/user_add'),
        meta: { title: '新增管理员', icon: 'table' }
      }
    ]
  },
  {
    path: '/router',
    component: Layout,
    redirect: '/router/routes',
    name: '路由管理',
    meta: { title: '路由管理', icon: 'example' },
    children: [
      {
        path: 'routes',
        name: '路由列表',
        component: () => import('@/views/router/routes'),
        meta: { title: '路由列表', icon: 'table' }
      }, {
        path: 'route_add',
        name: '新增路由',
        hidden: true,
        component: () => import('@/views/router/route_add'),
        meta: { title: '新增路由', icon: 'table' }
      }
    ]
  },
  {
    path: '/role',
    component: Layout,
    redirect: '/role/roles',
    name: '角色管理',
    meta: { title: '角色管理', icon: 'example' },
    children: [
      {
        path: 'roles',
        name: '角色列表',
        component: () => import('@/views/role/roles'),
        meta: { title: '角色列表', icon: 'table' }
      }, {
        path: 'role_add',
        name: '新增角色',
        component: () => import('@/views/role/role_add'),
        meta: { title: '新增角色', icon: 'table' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    hidden: true,
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

