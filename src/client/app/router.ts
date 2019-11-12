import VueRouter from 'vue-router';
import Index from './pages/Index.vue';

export default new VueRouter({
	routes: [
		{ path: '/', component: Index }
	]
});
