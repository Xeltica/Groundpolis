/**
 * App initializer
 */

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { version, codename, lang, locale } from './config';
import App from './app.vue';
import store from './store';
import registerPages from './pages';
import registerComponents from './components';

//#region FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

import { } from '@fortawesome/free-solid-svg-icons';

import { } from '@fortawesome/free-regular-svg-icons';

import { } from '@fortawesome/free-brands-svg-icons';
import router from './router';

library.add();
//#endregion

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.component('fa', FontAwesomeIcon);
Vue.component('fa-layer', FontAwesomeLayers);
Vue.component('fa-text', FontAwesomeLayersText);

/**
 * APP ENTRY POINT!
 */

console.info(`Groundpolis v${version} (${codename})`);
console.info(
	`%c${locale['common']['do-not-copy-paste']}`,
	'color: red; background: yellow; font-size: 16px; font-weight: bold;');

// BootTimer解除
window.clearTimeout((window as any).mkBootTimer);
delete (window as any).mkBootTimer;

//#region Set lang attr
const html = document.documentElement;
html.setAttribute('lang', lang);
//#endregion

// iOSでプライベートモードだとlocalStorageが使えないので既存のメソッドを上書きする
try {
	localStorage.setItem('test', 'a');
	localStorage.removeItem('test');
} catch (e) {
	Storage.prototype.setItem = () => { }; // noop
}

// クライアントを更新すべきならする
if (localStorage.getItem('should-refresh') == 'true') {
	localStorage.removeItem('should-refresh');
	location.reload(true);
}

document.body.innerHTML = '<div id="app"></div>';

registerPages();
registerComponents();

const vue = new Vue({
	el: '#app',
	store: store(),
	router,
	render: h => h(App),
});
