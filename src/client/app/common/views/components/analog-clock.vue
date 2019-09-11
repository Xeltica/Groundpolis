<template>
<svg class="mk-analog-clock" viewBox="0 0 10 10" preserveAspectRatio="none">
	<circle v-for="(angle, i) in graduations"
		:key="i"
		:cx="5 + (Math.sin(angle) * (5 - graduationsPadding))"
		:cy="5 - (Math.cos(angle) * (5 - graduationsPadding))"
		:r="i % 5 == 0 ? 0.125 : 0.05"
		:fill="i % 5 == 0 ? majorGraduationColor : minorGraduationColor"/>

	<line
		:x1="5 - (Math.sin(sAngle) * (sHandLengthRatio * handsTailLength))"
		:y1="5 + (Math.cos(sAngle) * (sHandLengthRatio * handsTailLength))"
		:x2="5 + (Math.sin(sAngle) * ((sHandLengthRatio * 5) - handsPadding))"
		:y2="5 - (Math.cos(sAngle) * ((sHandLengthRatio * 5) - handsPadding))"
		:stroke="sHandColor"
		stroke-width="0.05"/>
	<line
		:x1="5 - (Math.sin(mAngle) * (mHandLengthRatio * handsTailLength))"
		:y1="5 + (Math.cos(mAngle) * (mHandLengthRatio * handsTailLength))"
		:x2="5 + (Math.sin(mAngle) * ((mHandLengthRatio * 5) - handsPadding))"
		:y2="5 - (Math.cos(mAngle) * ((mHandLengthRatio * 5) - handsPadding))"
		:stroke="mHandColor"
		stroke-width="0.1"/>
	<line
		:x1="5 - (Math.sin(hAngle) * (hHandLengthRatio * handsTailLength))"
		:y1="5 + (Math.cos(hAngle) * (hHandLengthRatio * handsTailLength))"
		:x2="5 + (Math.sin(hAngle) * ((hHandLengthRatio * 5) - handsPadding))"
		:y2="5 - (Math.cos(hAngle) * ((hHandLengthRatio * 5) - handsPadding))"
		:stroke="hHandColor"
		stroke-width="0.1"/>
</svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import * as tinycolor from 'tinycolor2';

@Component
export default class AnalogClock extends Vue {
	@Prop({ default: false }) private dark: boolean;
	@Prop({ default: false }) private smooth: boolean;

	private now = new Date();
	private enabled = true;
	private graduationsPadding = 0.5;
	private handsPadding = 1;
	private handsTailLength = 0.7;
	private hHandLengthRatio = 0.75;
	private mHandLengthRatio = 1;
	private sHandLengthRatio = 1;

		public get majorGraduationColor(): string {
			return this.dark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
		}
		public get minorGraduationColor(): string {
			return this.dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
		}

		public get sHandColor(): string {
			return this.dark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)';
		}
		public get mHandColor(): string {
			return this.dark ? '#fff' : '#777';
		}
		public get hHandColor(): string {
			return tinycolor(getComputedStyle(document.documentElement).getPropertyValue('--primary')).toHexString();
		}

		public get ms(): number {
			return this.now.getMilliseconds() * (this.smooth ? 1 : 0);
		}
		public get s(): number {
			return this.now.getSeconds();
		}
		public get m(): number {
			return this.now.getMinutes();
		}
		public get h(): number {
			return this.now.getHours();
		}

		public get hAngle(): number {
			return Math.PI * (this.h % 12 + (this.m + (this.s + this.ms / 1000) / 60) / 60) / 6;
		}
		public get mAngle(): number {
			return Math.PI * (this.m + (this.s + this.ms / 1000) / 60) / 30;
		}
		public get sAngle(): number {
			return Math.PI * (this.s + this.ms / 1000) / 30;
		}

		public get graduations(): any {
			const angles = [] as any[];
			for (let i = 0; i < 60; i++) {
				const angle = Math.PI * i / 30;
				angles.push(angle);
			}

			return angles;
		}

	public mounted() {
		const update = () => {
			if (this.enabled) {
				this.tick();
				requestAnimationFrame(update);
			}
		};
		update();
	}

	public beforeDestroy() {
		this.enabled = false;
	}

	public tick() {
		this.now = new Date();
	}
}
</script>

<style lang="stylus" scoped>
.mk-analog-clock
	display block
</style>
