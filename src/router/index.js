import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
	{
		name: 'Home',
		path: '/',
		component: Home
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
