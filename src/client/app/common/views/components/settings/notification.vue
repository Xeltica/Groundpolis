<template>
<ui-card>
	<template #title><fa :icon="['far', 'bell']"/> {{ $t('title') }}</template>
	<section>
		<ui-switch v-model="$store.state.i.autoWatch" @change="onChangeAutoWatch">
			{{ $t('auto-watch') }}<template #desc>{{ $t('auto-watch-desc') }}</template>
		</ui-switch>
		<section>
			<ui-button @click="readAllNotifications">{{ $t('mark-as-read-all-notifications') }}</ui-button>
			<ui-button @click="readAllUnreadNotes">{{ $t('mark-as-read-all-unread-notes') }}</ui-button>
			<ui-button @click="readAllMessagingMessages">{{ $t('mark-as-read-all-talk-messages') }}</ui-button>
		</section>
	</section>
</ui-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import i18n from '../../../../i18n';

@Component({
	i18n: i18n('common/views/components/notification-settings.vue'),
})
export default class Notification extends Vue {
	public onChangeAutoWatch(v) {
		this.$root.api('i/update', {
			autoWatch: v
		});
	}

	public readAllUnreadNotes() {
		this.$root.api('i/read_all_unread_notes');
	}

	public readAllMessagingMessages() {
		this.$root.api('i/read_all_messaging_messages');
	}

	public readAllNotifications() {
		this.$root.api('notifications/mark_all_as_read');
	}
}
</script>
