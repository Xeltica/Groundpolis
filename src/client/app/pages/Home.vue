<template>
  <div id="app">
    <h1>Home</h1>
    <p>やあ、{{$store.state.i.id}}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style lang="stylus" module></style>
