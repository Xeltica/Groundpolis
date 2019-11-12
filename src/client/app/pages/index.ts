import Vue from 'vue';
import Home from './Home.vue';
import Index from './Index.vue';
import Welcome from './Welcome.vue';

export default () => {
	Vue.component('home', Home);
	Vue.component('index', Index);
	Vue.component('welcome', Welcome);
};
