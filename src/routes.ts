export default [
    {
        path: '/',
        // component: '@/layouts/index',
        routes: [
            { path: '/', component: '@/pages/index', name: '首页', },
            { path: '/volunteer', component: '@/pages/volunteer', name: '志愿填报模拟', },
            // { path: '/message', component: '@/pages/message', name: '消息' },
            // { path: '/todo', component: '@/pages/todo', name: '待办' },
            // { path: '/me', component: '@/pages/me', name: '我的' },
        ]
    }
];
