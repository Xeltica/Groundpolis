<template>
<div class="root">
	<ui-info v-if="!fetching && apps.length == 0">{{ $t('no-apps') }}</ui-info>
	<div class="apps" v-if="apps.length != 0">
		<div v-for="app in apps" :key="app.id">
			<p><b>{{ app.name }}</b></p>
			<p>{{ app.description }}</p>
		</div>
	</div>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import i18n from '../../../../i18n';
import { App } from '../../../../../../models/entities/app';
@Component({
	i18n: i18n('desktop/views/components/settings.apps.vue'),
})
export default class Apps extends Vue {
	private fetching = true;
	private apps: App[];

	public mounted() {
		this.$root.api('i/authorized_apps').then(apps => {
			this.apps = apps;
			this.fetching = false;
		});
	}
}
</script>

<style lang="stylus" scoped>
.root
	> .apps
		> div
			padding 16px 0 0 0
			border-bottom solid 1px #eee
</style>
