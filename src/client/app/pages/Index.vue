<template>
  <component :is="view" />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Index extends Vue {
  public get view() {
    return this.$store.state.i ? "home" : "welcome";
  }
}
</script>
