<template>
<component :is="$store.getters.isSignedIn ? 'home' : 'welcome'"></component>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Home from './home.vue';
import Welcome from './welcome.vue';

export default Vue.extend({
	components: {
		Home,
		Welcome
	}
});
</script>
