import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Login from '../pages/login/login'

import ATM from '../pages/ATM/index'
import more from '../pages/ATM/more'
import transferConfirmation from '../pages/ATM/transferConfirmation'
import transfer from '../pages/ATM/transfer'
import deposit from '../pages/ATM/deposit'
import score from '../pages/ATM/score'
import scoreInfo from '../pages/ATM/scoreInfo'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/login'
    },
		{
			path: '/index',
			component: Index,
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/ATM',
			component: ATM
		},
		{
			path: '/More',
			component: more
		},
		{
			path: '/transferConfirmation',
			component: transferConfirmation
		},
		{
			path: '/transfer',
			component: transfer
		},
		{
			path: '/deposit',
			component: deposit
		},
		{
			path: '/score',
			component: score
		},
		{
			path: '/scoreInfo',
			component: scoreInfo
		},
	]
})
