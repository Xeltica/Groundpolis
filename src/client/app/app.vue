<template>
	<router-view id="app" v-hotkey.global="keymap"></router-view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { url, lang } from './config';

@Component
export default class App extends Vue {
	public get keymap() {
		return {
			'h|slash': this.help,
			d: this.dark
		};
	}

	public help() {
		window.open(`${url}/docs/${lang}/keyboard-shortcut`, '_blank');
	}

	public dark() {
		this.$store.commit('device/set', {
			key: 'darkmode',
			value: !this.$store.state.device.darkmode
		});

	}
}
</script>
