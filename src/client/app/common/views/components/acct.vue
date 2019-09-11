<template>
<span class="mk-acct" v-once>
	<span class="name">@{{ user.username }}</span>
	<span class="host" :class="{ fade: $store.state.settings.contrastedAcct }" v-if="user.host || detail || $store.state.settings.showFullAcct">@{{ user.host || host }}</span>
	<fa v-if="user.isLocked == true" class="locked" icon="lock" fixed-width/>
</span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { host } from '../../../config';
import { toUnicode } from 'punycode';
import { User } from '../../../../../models/entities/user';
@Component
export default class Acct extends Vue {
	@Prop() private user: User;
	@Prop() private detail: string;

	private host = toUnicode(host);
}
</script>

<style lang="stylus" scoped>
.mk-acct
	> .host.fade
		opacity 0.5

	> .locked
		opacity 0.8
		margin-left 0.5em
</style>
