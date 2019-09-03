<template>
<div>
	<ui-card>
		<template #title><fa :icon="faDatabase"/> {{ $t('tables') }}</template>
		<section v-if="tables">
			<div :key="table" v-for="table in Object.keys(tables)"><b>{{ table }}</b> {{ tables[table].count | number }} {{ tables[table].size | bytes }}</div>
		</section>
		<section>
			<header><fa :icon="faBroom"/> {{ $t('vacuum') }}</header>
			<ui-info>{{ $t('vacuum-info') }}</ui-info>
			<ui-switch v-model="fullVacuum">FULL</ui-switch>
			<ui-switch v-model="analyzeVacuum">ANALYZE</ui-switch>
			<ui-button @click="vacuum()"><fa :icon="faBroom"/> {{ $t('vacuum') }}</ui-button>
			<ui-info warn>{{ $t('vacuum-exclamation') }}</ui-info>
		</section>
	</ui-card>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import i18n from '../../i18n';
import { faDatabase, faBroom } from '@fortawesome/free-solid-svg-icons';

@Component({
	i18n: i18n('admin/views/db.vue'),
})
export default class Db extends Vue {

	private tables: any;
	private fullVacuum: true;
	private analyzeVacuum: true;
	private faDatabase = faDatabase;
	private faBroom = faBroom;

	public mounted() {
		this.fetch();
	}

	public fetch() {
		this.$root.api('admin/get-table-stats').then(tables => {
			this.tables = tables;
		});
	}

	public vacuum() {
		this.$root.api('admin/vacuum', {
			full: this.fullVacuum,
			analyze: this.analyzeVacuum,
		}).then(() => {
			this.$root.dialog({
				type: 'success',
				splash: true
			});
		});
	}
}
</script>
