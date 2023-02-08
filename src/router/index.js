import { createRouter, createWebHashHistory  } from 'vue-router';
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: () => import('@/pages/Landing.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/pages/Register.vue')
        },
        {
            path: '/features',
            name: 'features',
            component: () => import('@/pages/Features.vue')
        },
        {
            path: '/highlights',
            name: 'highlights',
            component: () => import('@/pages/Highlights.vue')
        },
        {
            path: '/pricing',
            name: 'pricing',
            component: () => import('@/pages/Pricing.vue')
        },
        {
            path: '/claimer/getstarted',
            name: 'claimer_getstarted',
            component: () => import('@/pages/Claimer/ClaimerGetStarted.vue')
        },
        ,
        {
            path: '/other/setup',
            name: 'other_setup',
            component: () => import('@/pages/Other/Setup.vue')
        },
    ]
});

export default router;
