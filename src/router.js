import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import ScbDeposit from './views/BoardAdminDeposit'

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () =>
                import('./views/Profile.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            // lazy-loaded
            component: () => import('./views/BoardAdmin.vue'),
            // children: [
            //     {
            //         path: 'scb-deposit',
            //         component: ScbDeposit
            //     }
            // ]
        },
        {
            path: '/admin/scb-deposit',
            name: 'adminScbDeposit',
            component: () => import('./views/BoardAdminDeposit.vue')
        },
        {
            path: '/admin/users',
            name: 'admin-userboard',
            component: ()=> import('./views/BoardAdminUser.vue')
        },
        {
            path: '/admin/users/:id',
            name: 'admin-user-details',
            component: ()=> import('./components/User.vue')
        },
        {
            path: '/mod',
            name: 'moderator',
            // lazy-loaded
            component: () =>
                import('./views/BoardModerator.vue')
        },
        {
            path: '/user',
            name: 'user',
            // lazy-loaded
            component: () =>
                import('./views/BoardUser.vue')
        },
        {
            path: '/deposit',
            name: 'deposit',
            // lazy-loaded
            component: () =>
                import('./views/BoardUserDeposit.vue')
        }
    ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });