<template>
<div class="ui-form">
	<fieldset :disabled="disabled">
		<slot></slot>
	</fieldset>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class Form extends Vue {
	@Prop() private disabled: boolean;
}
</script>

<style lang="stylus" scoped>


.ui-form
	> fieldset
		margin 0
		padding 0
		border none

</style>
