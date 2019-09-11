<template>
<mk-user-list :pagination="pagination" :extract="items => items.map(item => item.followee)">{{ $t('@.following') }}</mk-user-list>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import parseAcct from '../../../../../misc/acct/parse';
import i18n from '../../../i18n';

@Component
export default class Vm extends Vue {
	i18n: i18n(),

	data() {
		return {
			pagination: {
				endpoint: 'users/following',
				limit: 30,
				params: {
					...parseAcct(this.$route.params.user),
				}
			},
		};
	},
}
</script>
