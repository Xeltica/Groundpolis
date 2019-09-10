<template>
<div class="urbixznjwwuukfsckrwzwsqzsxornqij">
	<header><b><mk-user-name :user="game.user1"/></b> vs <b><mk-user-name :user="game.user2"/></b></header>

	<div>
		<p>{{ $t('settings-of-the-game') }}</p>

		<div class="card map">
			<header>
				<select v-model="mapName" :placeholder="$t('choose-map')" @change="onMapChange">
					<option label="-Custom-" :value="mapName" v-if="mapName == '-Custom-'"/>
					<option :label="$t('random')" :value="null"/>
					<optgroup v-for="c in mapCategories" :key="c" :label="c">
						<option v-for="m in maps.filter(ma => ma.category == c)" :key="m.name" :label="m.name" :value="m.name">{{ m.name }}</option>
					</optgroup>
				</select>
			</header>

			<div>
				<div class="random" v-if="game.map == null"><fa icon="dice"/></div>
				<div class="board" v-else :style="{ 'grid-template-rows': `repeat(${ game.map.length }, 1fr)`, 'grid-template-columns': `repeat(${ game.map[0].length }, 1fr)` }">
					<div v-for="(x, i) in game.map.join('')"
							:key="i"
							:data-none="x == ' '"
							@click="onPixelClick(i, x)">
						<fa v-if="x == 'b'" :icon="fasCircle"/>
						<fa v-if="x == 'w'" :icon="farCircle"/>
					</div>
				</div>
			</div>
		</div>

		<div class="card">
			<header>
				<span>{{ $t('black-or-white') }}</span>
			</header>

			<div>
				<form-radio v-model="game.bw" value="random" @change="updateSettings('bw')">{{ $t('random') }}</form-radio>
				<form-radio v-model="game.bw" :value="1" @change="updateSettings('bw')">{{ this.$t('black-is').split('{}')[0] }}<b><mk-user-name :user="game.user1"/></b>{{ this.$t('black-is').split('{}')[1] }}</form-radio>
				<form-radio v-model="game.bw" :value="2" @change="updateSettings('bw')">{{ this.$t('black-is').split('{}')[0] }}<b><mk-user-name :user="game.user2"/></b>{{ this.$t('black-is').split('{}')[1] }}</form-radio>
			</div>
		</div>

		<div class="card">
			<header>
				<span>{{ $t('rules') }}</span>
			</header>

			<div>
				<ui-switch v-model="game.isLlotheo" @change="updateSettings('isLlotheo')">{{ $t('is-llotheo') }}</ui-switch>
				<ui-switch v-model="game.loopedBoard" @change="updateSettings('loopedBoard')">{{ $t('looped-map') }}</ui-switch>
				<ui-switch v-model="game.canPutEverywhere" @change="updateSettings('canPutEverywhere')">{{ $t('can-put-everywhere') }}</ui-switch>
			</div>
		</div>

		<div class="card form" v-if="form">
			<header>
				<span>{{ $t('settings-of-the-bot') }}</span>
			</header>

			<div>
				<template v-for="item in form">
					<ui-switch v-if="item.type == 'switch'" v-model="item.value" :key="item.id" @change="onChangeForm(item)">{{ item.label || item.desc || '' }}</ui-switch>

					<div class="card" v-if="item.type == 'radio'" :key="item.id">
						<header>
							<span>{{ item.label }}</span>
						</header>

						<div>
							<form-radio v-for="(r, i) in item.items" :key="item.id + ':' + i" v-model="item.value" :value="r.value" @change="onChangeForm(item)">{{ r.label }}</form-radio>
						</div>
					</div>

					<div class="card" v-if="item.type == 'slider'" :key="item.id">
						<header>
							<span>{{ item.label }}</span>
						</header>

						<div>
							<input type="range" :min="item.min" :max="item.max" :step="item.step || 1" v-model="item.value" @change="onChangeForm(item)"/>
						</div>
					</div>

					<div class="card" v-if="item.type == 'textbox'" :key="item.id">
						<header>
							<span>{{ item.label }}</span>
						</header>

						<div>
							<input v-model="item.value" @change="onChangeForm(item)"/>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>

	<footer>
		<p class="status">
			<template v-if="isAccepted && isOpAccepted">{{ $t('this-game-is-started-soon') }}<mk-ellipsis/></template>
			<template v-if="isAccepted && !isOpAccepted">{{ $t('waiting-for-other') }}<mk-ellipsis/></template>
			<template v-if="!isAccepted && isOpAccepted">{{ $t('waiting-for-me') }}</template>
			<template v-if="!isAccepted && !isOpAccepted">{{ $t('waiting-for-both') }}<mk-ellipsis/></template>
		</p>

		<div class="actions">
			<form-button @click="exit">{{ $t('cancel') }}</form-button>
			<form-button primary @click="accept" v-if="!isAccepted">{{ $t('ready') }}</form-button>
			<form-button primary @click="cancel" v-if="isAccepted">{{ $t('cancel-ready') }}</form-button>
		</div>
	</footer>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import i18n from '../../../../../i18n';
import * as maps from '../../../../../../../games/reversi/maps';
import { faCircle as fasCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import { ReversiGame } from '../../../../../../../models/entities/games/reversi/game';
import { Connection } from '../../../../scripts/Connection';

@Component({
	i18n: i18n('common/views/components/games/reversi/reversi.room.vue'),
})
export default class ReversiRoom extends Vue {
	@Prop() private game!: ReversiGame;
	@Prop() private connection!: Connection;

		private o: null;
		private isLlotheo = false;
		private mapName = maps.eighteight.name;
		private maps = maps;
		private form: any;
		private messages = [] as any[];
		private fasCircle = fasCircle;
		private farCircle = farCircle;

		public get mapCategories(): string[] {
			const categories = Object.values(maps).map(x => x.category);
			return categories.filter((item, pos) => item !== undefined && categories.indexOf(item) == pos) as string[];
		}

		public get isAccepted(): boolean {
			if (this.game.user1Id == this.$store.state.i.id && this.game.user1Accepted) return true;
			if (this.game.user2Id == this.$store.state.i.id && this.game.user2Accepted) return true;
			return false;
		}

		public get isOpAccepted(): boolean {
			if (this.game.user1Id != this.$store.state.i.id && this.game.user1Accepted) return true;
			if (this.game.user2Id != this.$store.state.i.id && this.game.user2Accepted) return true;
			return false;
		}

	public created() {
		this.connection.on('changeAccepts', this.onChangeAccepts);
		this.connection.on('updateSettings', this.onUpdateSettings);
		this.connection.on('initForm', this.onInitForm);
		this.connection.on('message', this.onMessage);

		if (this.game.user1Id != this.$store.state.i.id && this.game.form1) this.form = this.game.form1;
		if (this.game.user2Id != this.$store.state.i.id && this.game.form2) this.form = this.game.form2;
	}

	public beforeDestroy() {
		this.connection.off('changeAccepts', this.onChangeAccepts);
		this.connection.off('updateSettings', this.onUpdateSettings);
		this.connection.off('initForm', this.onInitForm);
		this.connection.off('message', this.onMessage);
	}

	public exit() {

	}

	public accept() {
		this.connection.send('accept', {});
	}

	public cancel() {
		this.connection.send('cancelAccept', {});
	}

	public onChangeAccepts(accepts) {
		this.game.user1Accepted = accepts.user1;
		this.game.user2Accepted = accepts.user2;
		this.$forceUpdate();
	}

	public updateSettings(key: string) {
		this.connection.send('updateSettings', {
			key: key,
			value: this.game[key]
		});
	}

	public onUpdateSettings({ key, value }) {
		this.game[key] = value;
		if (!this.game.map) {
			this.mapName = undefined;
		} else {
			const found = Object.values(maps).find(x => x.data.join('') == this.game.map.join(''));
			this.mapName = found ? found.name : '-Custom-';
		}
	}

	public onInitForm(x) {
		if (x.userId == this.$store.state.i.id) return;
		this.form = x.form;
	}

	public onMessage(x) {
		if (x.userId == this.$store.state.i.id) return;
		this.messages.unshift(x.message);
	}

	public onChangeForm(item) {
		this.connection.send('updateForm', {
			id: item.id,
			value: item.value
		});
	}

	public onMapChange() {
		if (!this.mapName) {
			this.game.map = [];
		} else {
			this.game.map = Object.values(maps).find(x => x.name == this.mapName)!.data;
		}
		this.$forceUpdate();
		this.updateSettings('map');
	}

	public onPixelClick(pos, pixel) {
		const x = pos % this.game.map[0].length;
		const y = Math.floor(pos / this.game.map[0].length);
		const newPixel =
			pixel == ' ' ? '-' :
			pixel == '-' ? 'b' :
			pixel == 'b' ? 'w' :
			' ';
		const line = this.game.map[y].split('');
		line[x] = newPixel;
		this.$set(this.game.map, y, line.join(''));
		this.$forceUpdate();
		this.updateSettings('map');
	}
}
</script>

<style lang="stylus" scoped>
.urbixznjwwuukfsckrwzwsqzsxornqij
	text-align center
	background var(--bg)

	> header
		padding 8px
		border-bottom dashed 1px #c4cdd4

	> div
		padding 0 16px

		> .card
			margin 0 auto 16px auto

			&.map
				> header
					> select
						width 100%
						padding 12px 14px
						background var(--face)
						border 1px solid var(--reversiMapSelectBorder)
						border-radius 4px
						color var(--text)
						cursor pointer
						transition border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)
						-webkit-appearance none
						-moz-appearance none
						appearance none

						&:hover
							border-color var(--reversiMapSelectHoverBorder)

						&:focus
						&:active
							border-color var(--primary)

				> div
					> .random
						padding 32px 0
						font-size 64px
						color var(--text)
						opacity 0.7

					> .board
						display grid
						grid-gap 4px
						width 300px
						height 300px
						margin 0 auto
						color var(--text)

						> div
							background transparent
							border solid 2px var(--faceDivider)
							border-radius 6px
							overflow hidden
							cursor pointer

							*
								pointer-events none
								user-select none
								width 100%
								height 100%

							&[data-none]
								border-color transparent

			&.form
				> div
					> .card + .card
						margin-top 16px

					input[type='range']
						width 100%

		.card
			max-width 400px
			border-radius 4px
			background var(--face)
			color var(--text)
			box-shadow 0 2px 12px 0 var(--reversiRoomFormShadow)

			> header
				padding 18px 20px
				border-bottom 1px solid var(--faceDivider)

			> div
				padding 20px
				color var(--text)

	> footer
		position sticky
		bottom 0
		padding 16px
		background var(--reversiRoomFooterBg)
		border-top solid 1px var(--faceDivider)

		> .status
			margin 0 0 16px 0

</style>
