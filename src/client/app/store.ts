import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const defaultSettings = {
};

const defaultDeviceSettings = {
};

export default () => new Vuex.Store({
	plugins: [createPersistedState({
		paths: ['i', 'device', 'settings']
	})],

	state: {
		i: null as string | null,
		indicate: false,
		uiHeaderHeight: 0,
		settings: defaultSettings as typeof defaultSettings,
		device: defaultDeviceSettings as typeof defaultDeviceSettings,
		behindNotes: []
	},

	getters: {
		isSignedIn: state => state.i != null,
	},

	mutations: {

	},

	actions: {
	},

	modules: {
		device: {
			namespaced: true,

			state: defaultDeviceSettings,

			mutations: {
			}
		},

		settings: {
			namespaced: true,

			state: defaultSettings,

			mutations: {
			},

			actions: {
			}
		}
	}
});
