<template>
<div>
	<ui-card>
		<template #title><fa :icon="faStream"/> {{ $t('logs') }}</template>
		<section class="fit-top">
			<ui-horizon-group inputs>
				<ui-input v-model="domain" :debounce="true">
					<span>{{ $t('domain') }}</span>
				</ui-input>
				<ui-select v-model="level">
					<template #label>{{ $t('level') }}</template>
					<option value="all">{{ $t('levels.all') }}</option>
					<option value="info">{{ $t('levels.info') }}</option>
					<option value="success">{{ $t('levels.success') }}</option>
					<option value="warning">{{ $t('levels.warning') }}</option>
					<option value="error">{{ $t('levels.error') }}</option>
					<option value="debug">{{ $t('levels.debug') }}</option>
				</ui-select>
			</ui-horizon-group>

			<div class="nqjzuvev">
				<code v-for="log in logs" :key="log.id" :class="log.level">
					<details>
						<summary><mk-time :time="log.createdAt"/> [{{ log.domain.join('.') }}] {{ log.message }}</summary>
						<vue-json-pretty v-if="log.data" :data="log.data"></vue-json-pretty>
					</details>
				</code>
			</div>

			<ui-button @click="deleteAll()">{{ $t('delete-all') }}</ui-button>
		</section>
	</ui-card>
</div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import i18n from '../../i18n';
import { faStream } from '@fortawesome/free-solid-svg-icons';
import VueJsonPretty from 'vue-json-pretty';
import { Log } from '../../../../models/entities/log';

@Component({
	i18n: i18n('admin/views/logs.vue'),

	components: {
		VueJsonPretty
	},
})
export default class Logs extends Vue {

	private logs: Log[] = [];
	private level = 'all';
	private domain = '';
	private faStream = faStream;

	@Watch('level')
	public watchLevel() {
		this.logs = [];
		this.fetch();
	}

	@Watch('domain')
	public watchDomain() {
		this.logs = [];
		this.fetch();
	}

	public mounted() {
		this.fetch();
	}

	public fetch() {
		this.$root.api('admin/logs', {
			level: this.level === 'all' ? null : this.level,
			domain: this.domain === '' ? null : this.domain,
			limit: 100
		}).then(logs => {
			this.logs = logs.reverse();
		});
	}

	public deleteAll() {
		this.$root.api('admin/delete-logs').then(() => {
			this.$root.dialog({
				type: 'success',
				splash: true
			});
		});
	}
}
</script>

<style lang="stylus" scoped>
.nqjzuvev
	padding 8px
	background #000
	color #fff
	font-size 14px

	> code
		display block

		&.error
			color #f00

		&.warning
			color #ff0

		&.success
			color #0f0

		&.debug
			opacity 0.7

</style>
