<template>
<div>
	<x-room v-if="!g.isStarted" :game="g" :connection="connection"/>
	<x-game v-else :init-game="g" :connection="connection" :self-nav="selfNav" @go-index="goIndex"/>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import i18n from '../../../../../i18n';
import XGame from './reversi.game.vue';
import XRoom from './reversi.room.vue';
import { Connection } from '../../../../scripts/Connection';
import { ReversiGame } from '../../../../../../../models/entities/games/reversi/game';

@Component({
	i18n: i18n('common/views/components/games/reversi/reversi.gameroom.vue'),
	components: {
		XGame,
		XRoom
	},
})
export default class ReversiGameRoom extends Vue {
	@Prop() private readonly game!: ReversiGame;
	@Prop() private readonly selfNav!: boolean;

	private connection: Connection;
	private g: any;

	public created() {
		this.g = this.game;
		this.connection = this.$root.stream.connectToChannel('gamesReversiGame', {
			gameId: this.game.id
		});
		this.connection.on('started', this.onStarted);
	}

	public beforeDestroy() {
		this.connection.dispose();
	}

	public onStarted(game) {
		Object.assign(this.g, game);
		this.$forceUpdate();
	}

	public goIndex() {
		this.$emit('go-index');
	}
}
</script>
