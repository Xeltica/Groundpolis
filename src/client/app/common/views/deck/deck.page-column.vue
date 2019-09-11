<template>
<x-column>
	<template #header>
		<fa :icon="faStickyNote"/>{{ page ? page.name : '' }}
	</template>

	<div v-if="page">
		<x-page :page="page" :key="page.id"/>
	</div>
</x-column>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import i18n from '../../../i18n';
import XColumn from './deck.column.vue';
import XPage from '../../../common/views/components/page/page.vue';

@Component
export default class Vm extends Vue {
	i18n: i18n(),

	components: {
		XColumn,
		XPage
	},

	props: {
		pageName: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		},
	},

	data() {
		return {
			page: null,
			faStickyNote
		};
	},

	watch: {
		$route: 'fetch'
	},

	created() {
		this.fetch();
	},

	methods: {
		fetch() {
			this.$root.api('pages/show', {
				name: this.pageName,
				username: this.username,
			}).then(page => {
				this.page = page;
				this.$emit('init', {
					title: this.page.title,
					icon: faStickyNote
				});
			});
		}
	}
}
</script>
