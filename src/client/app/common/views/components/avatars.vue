<template>
<div>
	<mk-avatar v-for="user in us" :user="user" :key="user.id" style="width:32px;height:32px;"/>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Vm extends Vue {
	props: {
		userIds: {
			required: true
		},
	},
	data() {
		return {
			us: []
		};
	},
	async created() {
		this.us = await this.$root.api('users/show', {
			userIds: this.userIds
		});
	}
}
</script>
