<template>
<div>
	<mk-avatar v-for="user in us" :user="user" :key="user.id" style="width:32px;height:32px;"/>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { User } from '../../../../../models/entities/user';

@Component
export default class Avatars extends Vue {
	@Prop() private readonly userIds: string[];
	private us: User[];

	public async created() {
		this.us = await this.$root.api('users/show', {
			userIds: this.userIds
		});
	}
}
</script>
