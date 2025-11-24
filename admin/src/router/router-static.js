import Vue from 'vue';
// Configure routes
import VueRouter from 'vue-router'

Vue.use(VueRouter);
// 1. Create components
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
import news from '@/views/modules/news/list'
import haikuanshenqing from '@/views/modules/haikuanshenqing/list'
import aboutus from '@/views/modules/aboutus/list'
import yinxingzhanghu from '@/views/modules/yinxingzhanghu/list'
import bankakaihu from '@/views/modules/bankakaihu/list'
import daikuanzhuanyuan from '@/views/modules/daikuanzhuanyuan/list'
import qukuanjilu from '@/views/modules/qukuanjilu/list'
import friendlink from '@/views/modules/friendlink/list'
import systemintro from '@/views/modules/systemintro/list'
import kehu from '@/views/modules/kehu/list'
import zhuanzhangjilu from '@/views/modules/zhuanzhangjilu/list'
import daikuanshenqing from '@/views/modules/daikuanshenqing/list'
import cunkuanjilu from '@/views/modules/cunkuanjilu/list'
import gift from '@/views/modules/gift/list'
import gift_exchange from '@/views/modules/giftexchange/list'
import config from '@/views/modules/config/list'
import juyuan from '@/views/modules/juyuan/list'
import zhuxiao from '@/views/modules/zhuxiao/list'
import newstype from '@/views/modules/newstype/list'


// 2. Configure routes   Note: names
export const routes = [{
    path: '/',
    name: 'System Home',
    component: Index,
    children: [{
        // Not setting a value here makes main the default page
        path: '/',
        name: 'System Home',
        component: Home,
        meta: {icon: '', title: 'center', affix: true}
    }, {
        path: '/updatePassword',
        name: 'Change Password',
        component: UpdatePassword,
        meta: {icon: '', title: 'updatePassword'}
    }, {
        path: '/pay',
        name: 'Payment',
        component: pay,
        meta: {icon: '', title: 'pay'}
    }, {
        path: '/center',
        name: 'Personal Information',
        component: center,
        meta: {icon: '', title: 'center'}
    }
        , {
            path: '/news',
            name: 'News Announcements',
            component: news
        }
        , {
            path: '/haikuanshenqing',
            name: 'Repayment Application',
            component: haikuanshenqing
        }
        , {
            path: '/aboutus',
            name: 'About Us',
            component: aboutus
        }
        , {
            path: '/yinxingzhanghu',
            name: 'Bank Accounts',
            component: yinxingzhanghu
        }
        , {
            path: '/bankakaihu',
            name: 'Open Account',
            component: bankakaihu
        }
        , {
            path: '/daikuanzhuanyuan',
            name: 'Loan Specialists',
            component: daikuanzhuanyuan
        }
        , {
            path: '/qukuanjilu',
            name: 'Withdrawal Records',
            component: qukuanjilu
        }
        , {
            path: '/friendlink',
            name: 'Friendly Links',
            component: friendlink
        }
        , {
            path: '/systemintro',
            name: 'System Introduction',
            component: systemintro
        }
        , {
            path: '/kehu',
            name: 'Customers',
            component: kehu
        }
        , {
            path: '/zhuanzhangjilu',
            name: 'Transfer Records',
            component: zhuanzhangjilu
        }
        , {
            path: '/daikuanshenqing',
            name: 'Loan Application',
            component: daikuanshenqing
        }
        , {
            path: '/cunkuanjilu',
            name: 'Deposit Records',
            component: cunkuanjilu
        },
        {
            path: '/gift',
            name: 'Gift info',
            component: gift
        },
        {
            path: '/gift_exchange',
            name: 'GiftExchange Records',
            component: gift_exchange
        }
        , {
            path: '/config',
            name: 'Carousel Management',
            component: config
        }
        , {
            path: '/juyuan',
            name: 'Tellers',
            component: juyuan
        }
        , {
            path: '/zhuxiao',
            name: 'Account Cancellation',
            component: zhuxiao
        }
        , {
            path: '/newstype',
            name: 'News Announcement Categories',
            component: newstype
        }
    ]
},
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {icon: '', title: 'login'}
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta: {icon: '', title: 'register'}
    },
    {
        path: '*',
        component: NotFound
    }
]
// 3. Instantiate VueRouter  Note: name
const router = new VueRouter({
    mode: 'hash',
    /*hash mode changed to history*/
    routes // (abbreviation) equivalent to routes: routes
})
const originalPush = VueRouter.prototype.push
// Modify the push method in the prototype object
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router;