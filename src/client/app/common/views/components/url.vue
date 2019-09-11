<template>
<component :is="hasRoute ? 'router-link' : 'a'" class="mk-url" :[attr]="hasRoute ? url.substr(local.length) : url" :rel="rel" :target="target">
	<template v-if="!self">
		<span class="schema">{{ schema }}//</span>
		<span class="hostname">{{ hostname }}</span>
		<span class="port" v-if="port != ''">:{{ port }}</span>
	</template>
	<template v-if="pathname === '/' && self">
		<span class="self">{{ hostname }}</span>
	</template>
	<span class="pathname" v-if="pathname != ''">{{ self ? pathname.substr(1) : pathname }}</span>
	<span class="query">{{ query }}</span>
	<span class="hash">{{ hash }}</span>
	<fa icon="external-link-square-alt" v-if="target === '_blank'"/>
</component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { toUnicode as decodePunycode } from 'punycode';
import { url as local } from '../../../config';

@Component
export default class Url extends Vue {
	@Prop() private url: string;
	@Prop() private rel: string;
	private local = local;
	private schema: string | null;
	private hostname: string | null;
	private port: string | null;
	private pathname: string | null;
	private query: string | null;
	private hash: string | null;
	private self = false;
	private hasRoute = false;
	private attr: string | null;
	private target: string | null;

	public created() {
		const url = new URL(this.url);
		this.self = this.url.startsWith(local);
		this.hasRoute = this.self && (
			(this.url.substr(local.length) === '/') ||
			this.url.substr(local.length).startsWith('/@') ||
			this.url.substr(local.length).startsWith('/notes/') ||
			this.url.substr(local.length).startsWith('/tags/') ||
			this.url.substr(local.length).startsWith('/pages/'));
		this.attr = this.hasRoute ? 'to' : 'href';
		this.target = this.hasRoute ? null : '_blank';

		this.schema = url.protocol;
		this.hostname = decodePunycode(url.hostname);
		this.port = url.port;
		this.pathname = decodeURIComponent(url.pathname);
		this.query = decodeURIComponent(url.search);
		this.hash = decodeURIComponent(url.hash);
	}
}
</script>

<style lang="stylus" scoped>
.mk-url
	word-break break-all

	> [data-icon]
		padding-left 2px
		font-size .9em
		font-weight 400
		font-style normal

	> .self
		font-weight bold

	> .schema
		opacity 0.5

	> .hostname
		font-weight bold

	> .pathname
		opacity 0.8

	> .query
		opacity 0.5

	> .hash
		font-style italic
</style>
