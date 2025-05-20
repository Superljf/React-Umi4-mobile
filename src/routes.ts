export default [
    {
        path: '/',
        // component: '@/layouts/index',
        routes: [
            { path: '/', redirect: '/zhihu/202505' },
            { path: '/zhihu/202505', component: '@/pages/home/index.tsx', name: '首页', },
        ]
    }
];
