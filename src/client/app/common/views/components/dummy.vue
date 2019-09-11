<template>
<div>
	<slot></slot>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Vm extends Vue {
}
</script>
