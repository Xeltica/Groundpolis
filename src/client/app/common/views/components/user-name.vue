<template>
<mfm :text="user.name || user.username" :plain="true" :nowrap="nowrap" :custom-emojis="user.emojis"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

export default Vue.extend({
	props: {
		user: {
			type: Object,
			required: true
		},
		nowrap: {
			type: Boolean,
			default: true
		},
	}
});
</script>
