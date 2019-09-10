<template>
<div class="nqfhvmnl">
	<template v-if="page == null || page == 'profile'">
		<x-profile/>
		<x-integration/>
	</template>

	<template v-if="page == null || page == 'appearance'">
		<x-theme/>

		<ui-card>
			<template #title><fa icon="desktop"/> {{ $t('@._settings.appearance') }}</template>

			<section v-if="!$root.isMobile">
				<ui-switch v-model="showPostFormOnTopOfTl">{{ $t('@._settings.post-form-on-timeline') }}</ui-switch>
				<ui-button @click="customizeHome">{{ $t('@.customize-home') }}</ui-button>
			</section>
			<section v-if="!$root.isMobile">
				<header>{{ $t('@._settings.wallpaper') }}</header>
				<ui-horizon-group class="fit-bottom">
					<ui-button @click="updateWallpaper">{{ $t('@._settings.choose-wallpaper') }}</ui-button>
					<ui-button @click="deleteWallpaper">{{ $t('@._settings.delete-wallpaper') }}</ui-button>
				</ui-horizon-group>
			</section>
			<section v-if="!$root.isMobile">
				<header>{{ $t('@._settings.navbar-position') }}</header>
				<ui-radio v-model="navbar" value="top">{{ $t('@._settings.navbar-position-top') }}</ui-radio>
				<ui-radio v-model="navbar" value="left">{{ $t('@._settings.navbar-position-left') }}</ui-radio>
				<ui-radio v-model="navbar" value="right">{{ $t('@._settings.navbar-position-right') }}</ui-radio>
			</section>
			<section>
				<ui-switch v-model="useShadow">{{ $t('@._settings.use-shadow') }}</ui-switch>
				<ui-switch v-model="roundedCorners">{{ $t('@._settings.rounded-corners') }}</ui-switch>
				<ui-switch v-model="circleIcons">{{ $t('@._settings.circle-icons') }}</ui-switch>
				<ui-switch v-model="reduceMotion">{{ $t('@._settings.reduce-motion') }}</ui-switch>
				<ui-switch v-model="contrastedAcct">{{ $t('@._settings.contrasted-acct') }}</ui-switch>
				<ui-switch v-model="showFullAcct">{{ $t('@._settings.show-full-acct') }}</ui-switch>
				<ui-switch v-model="showVia">{{ $t('@._settings.show-via') }}</ui-switch>
				<ui-switch v-model="useOsDefaultEmojis">{{ $t('@._settings.use-os-default-emojis') }}</ui-switch>
				<ui-switch v-model="iLikeSushi">{{ $t('@._settings.i-like-sushi') }}</ui-switch>
			</section>
			<section>
				<ui-switch v-model="suggestRecentHashtags">{{ $t('@._settings.suggest-recent-hashtags') }}</ui-switch>
				<ui-switch v-model="showClockOnHeader" v-if="!$root.isMobile">{{ $t('@._settings.show-clock-on-header') }}</ui-switch>
				<ui-switch v-model="alwaysShowNsfw">{{ $t('@._settings.always-show-nsfw') }}</ui-switch>
				<ui-switch v-model="showReplyTarget">{{ $t('@._settings.show-reply-target') }}</ui-switch>
				<ui-switch v-model="disableAnimatedMfm">{{ $t('@._settings.disable-animated-mfm') }}</ui-switch>
				<ui-switch v-model="disableShowingAnimatedImages">{{ $t('@._settings.disable-showing-animated-images') }}</ui-switch>
				<ui-switch v-model="remainDeletedNote">{{ $t('@._settings.remain-deleted-note') }}</ui-switch>
				<ui-switch v-model="enableMobileQuickNotificationView">{{ $t('@._settings.enable-quick-notification-view') }}</ui-switch>
			</section>
			<section>
				<header>Instance Ticker</header>
				<p><small>Powered by <a href="https://wee.jp/">#InstanceTicker</a></small></p>
				<ui-select v-model="tickerMode">
					<option value="0">{{ $t('@._settings.instance-ticker-0') }}</option>
					<option value="1">{{ $t('@._settings.instance-ticker-1') }}</option>
					<option value="2">{{ $t('@._settings.instance-ticker-2') }}</option>
				</ui-select>
			</section>
			<section>
				<header>{{ $t('@._settings.line-width') }}</header>
				<ui-radio v-model="lineWidth" :value="0.5">{{ $t('@._settings.line-width-thin') }}</ui-radio>
				<ui-radio v-model="lineWidth" :value="1">{{ $t('@._settings.line-width-normal') }}</ui-radio>
				<ui-radio v-model="lineWidth" :value="2">{{ $t('@._settings.line-width-thick') }}</ui-radio>
			</section>
			<section>
				<header>{{ $t('@._settings.font-size') }}</header>
				<ui-radio v-model="fontSize" :value="-2">{{ $t('@._settings.font-size-x-small') }}</ui-radio>
				<ui-radio v-model="fontSize" :value="-1">{{ $t('@._settings.font-size-small') }}</ui-radio>
				<ui-radio v-model="fontSize" :value="0">{{ $t('@._settings.font-size-medium') }}</ui-radio>
				<ui-radio v-model="fontSize" :value="1">{{ $t('@._settings.font-size-large') }}</ui-radio>
				<ui-radio v-model="fontSize" :value="2">{{ $t('@._settings.font-size-x-large') }}</ui-radio>
			</section>
			<section v-if="$root.isMobile">
				<header>{{ $t('@._settings.post-style') }}</header>
				<ui-radio v-model="postStyle" value="standard">{{ $t('@._settings.post-style-standard') }}</ui-radio>
				<ui-radio v-model="postStyle" value="smart">{{ $t('@._settings.post-style-smart') }}</ui-radio>
			</section>
			<section v-if="$root.isMobile">
				<header>{{ $t('@._settings.notification-position') }}</header>
				<ui-radio v-model="mobileNotificationPosition" value="bottom">{{ $t('@._settings.notification-position-bottom') }}</ui-radio>
				<ui-radio v-model="mobileNotificationPosition" value="top">{{ $t('@._settings.notification-position-top') }}</ui-radio>
			</section>
			<section>
				<header>{{ $t('@._settings.deck-column-align') }}</header>
				<ui-radio v-model="deckColumnAlign" value="center">{{ $t('@._settings.deck-column-align-center') }}</ui-radio>
				<ui-radio v-model="deckColumnAlign" value="left">{{ $t('@._settings.deck-column-align-left') }}</ui-radio>
				<ui-radio v-model="deckColumnAlign" value="flexible">{{ $t('@._settings.deck-column-align-flexible') }}</ui-radio>
			</section>
			<section>
				<header>{{ $t('@._settings.deck-column-width') }}</header>
				<ui-radio v-model="deckColumnWidth" value="narrow">{{ $t('@._settings.deck-column-width-narrow') }}</ui-radio>
				<ui-radio v-model="deckColumnWidth" value="narrower">{{ $t('@._settings.deck-column-width-narrower') }}</ui-radio>
				<ui-radio v-model="deckColumnWidth" value="normal">{{ $t('@._settings.deck-column-width-normal') }}</ui-radio>
				<ui-radio v-model="deckColumnWidth" value="wider">{{ $t('@._settings.deck-column-width-wider') }}</ui-radio>
				<ui-radio v-model="deckColumnWidth" value="wide">{{ $t('@._settings.deck-column-width-wide') }}</ui-radio>
			</section>
			<section>
				<ui-switch v-model="games_reversi_showBoardLabels">{{ $t('@._settings.show-reversi-board-labels') }}</ui-switch>
				<ui-switch v-model="games_reversi_useAvatarStones">{{ $t('@._settings.use-avatar-reversi-stones') }}</ui-switch>
			</section>
		</ui-card>
	</template>

	<template v-if="page == null || page == 'behavior'">
		<ui-card>
			<template #title><fa icon="sliders-h"/> {{ $t('@._settings.behavior') }}</template>

			<section>
				<ui-switch v-model="fetchOnScroll">{{ $t('@._settings.fetch-on-scroll') }}
					<template #desc>{{ $t('@._settings.fetch-on-scroll-desc') }}</template>
				</ui-switch>
				<ui-switch v-model="keepCw">{{ $t('@._settings.keep-cw') }}
					<template #desc>{{ $t('@._settings.keep-cw-desc') }}</template>
				</ui-switch>
				<ui-switch v-if="$root.isMobile" v-model="disableViaMobile">{{ $t('@._settings.disable-via-mobile') }}</ui-switch>
			</section>

			<section>
				<header>{{ $t('@._settings.timeline') }}</header>
				<ui-switch v-model="showMyRenotes">{{ $t('@._settings.show-my-renotes') }}</ui-switch>
				<ui-switch v-model="showRenotedMyNotes">{{ $t('@._settings.show-renoted-my-notes') }}</ui-switch>
				<ui-switch v-model="showLocalRenotes">{{ $t('@._settings.show-local-renotes') }}</ui-switch>
			</section>

			<section>
				<header>{{ $t('@._settings.note-visibility') }}</header>
				<ui-switch v-model="rememberNoteVisibility">{{ $t('@._settings.remember-note-visibility') }}</ui-switch>				
				<section>
					<header>{{ $t('@._settings.default-note-visibility') }}</header>
					<ui-select v-model="defaultNoteVisibility">
						<option v-for="visibility in visibilities" :value="visibility" :key=visibility>{{ $t(`@.note-visibility.${visibility}`) }}</option>
					</ui-select>
				</section>
			</section>

			<section>
				<header>{{ $t('@._settings.visibility-switch') }}</header>
				<p>{{ $t('@._settings.visibility-switch-desc') }}</p>
				<ui-switch v-model="useVisibilitySwitch">{{ $t('@._settings.use-visibility-switch') }}</ui-switch>
				<template v-if="useVisibilitySwitch">
					<!-- Home -->
					<ui-select v-model="homeNoteVisibility">
						<template #label>{{ $t('@._settings.visibility-switch-home') }}</template>
						<option v-for="visibility in visibilities" :value="visibility" :key=visibility>{{ $t(`@.note-visibility.${visibility}`) }}</option>						
						<option value="default">{{ $t('@._settings.default-note-visibility') }}</option>
					</ui-select>
					<!-- Local -->
					<ui-select v-model="localNoteVisibility">
						<template #label>{{ $t('@._settings.visibility-switch-local') }}</template>
						<option v-for="visibility in visibilities" :value="visibility" :key=visibility>{{ $t(`@.note-visibility.${visibility}`) }}</option>
						<option value="default">{{ $t('@._settings.default-note-visibility') }}</option>
					</ui-select>					
					<!-- Hybrid -->
					<ui-select v-model="hybridNoteVisibility">
						<template #label>{{ $t('@._settings.visibility-switch-hybrid') }}</template>
						<option v-for="visibility in visibilities" :value="visibility" :key=visibility>{{ $t(`@.note-visibility.${visibility}`) }}</option>
						<option value="default">{{ $t('@._settings.default-note-visibility') }}</option>
					</ui-select>					
					<!-- Global -->
					<ui-select v-model="globalNoteVisibility">
						<template #label>{{ $t('@._settings.visibility-switch-global') }}</template>
						<option v-for="visibility in visibilities" :value="visibility" :key=visibility>{{ $t(`@.note-visibility.${visibility}`) }}</option>
						<option value="default">{{ $t('@._settings.default-note-visibility') }}</option>
					</ui-select>					
				</template>
			</section>

			<section>
				<header>{{ $t('@._settings.sync') }}</header>
				<ui-input v-if="$root.isMobile" v-model="mobileHomeProfile" :datalist="Object.keys($store.state.settings.mobileHomeProfiles)">{{ $t('@._settings.home-profile') }}</ui-input>
				<ui-input v-else v-model="homeProfile" :datalist="Object.keys($store.state.settings.homeProfiles)">{{ $t('@._settings.home-profile') }}</ui-input>
				<ui-input v-model="deckProfile" :datalist="Object.keys($store.state.settings.deckProfiles)">{{ $t('@._settings.deck-profile') }}</ui-input>
			</section>

			<section>
				<header>{{ $t('@._settings.web-search-engine') }}</header>
				<ui-input v-model="webSearchEngine">{{ $t('@._settings.web-search-engine') }}
					<template #desc>{{ $t('@._settings.web-search-engine-desc') }}</template>
				</ui-input>
				<ui-button @click="save('webSearchEngine', webSearchEngine)"><fa :icon="faSave"/> {{ $t('@._settings.save') }}</ui-button>
			</section>

			<section v-if="!$root.isMobile">
				<header>{{ $t('@._settings.paste') }}</header>
				<ui-input v-model="pastedFileName">{{ $t('@._settings.pasted-file-name') }}
					<template v-if="pastedFileName === this.$store.state.settings.pastedFileName" #desc>{{ $t('@._settings.pasted-file-name-desc') }}</template>
					<template v-else #desc>{{ pastedFileNamePreview() }}</template>
				</ui-input>
				<ui-button @click="save('pastedFileName', pastedFileName)"><fa :icon="faSave"/> {{ $t('@._settings.save') }}</ui-button>

				<ui-switch v-model="pasteDialog">{{ $t('@._settings.paste-dialog') }}
					<template #desc>{{ $t('@._settings.paste-dialog-desc') }}</template>
				</ui-switch>
			</section>

			<section>
				<header>{{ $t('@._settings.room') }}</header>
				<ui-select v-model="roomGraphicsQuality">
					<template #label>{{ $t('@._settings._room.graphicsQuality') }}</template>
					<option value="ultra">{{ $t('@._settings._room._graphicsQuality.ultra') }}</option>
					<option value="high">{{ $t('@._settings._room._graphicsQuality.high') }}</option>
					<option value="medium">{{ $t('@._settings._room._graphicsQuality.medium') }}</option>
					<option value="low">{{ $t('@._settings._room._graphicsQuality.low') }}</option>
					<option value="cheep">{{ $t('@._settings._room._graphicsQuality.cheep') }}</option>
				</ui-select>
				<ui-switch v-model="roomUseOrthographicCamera">{{ $t('@._settings._room.useOrthographicCamera') }}</ui-switch>
			</section>
		</ui-card>

		<ui-card>
			<template #title><fa icon="volume-up"/> {{ $t('@._settings.sound') }}</template>

			<section>
				<ui-switch v-model="enableSounds">{{ $t('@._settings.enable-sounds') }}
					<template #desc>{{ $t('@._settings.enable-sounds-desc') }}</template>
				</ui-switch>
				<ui-switch :disabled="!enableSounds" v-model="enableSoundsInTimeline">{{ $t('@._settings.enable-sounds-timeline') }}
				</ui-switch>
				<ui-switch :disabled="!enableSounds" v-model="enableSoundsInNotifications">{{ $t('@._settings.enable-sounds-notifications') }}
				</ui-switch>
				<label>{{ $t('@._settings.volume') }}</label>
				<input type="range"
					v-model="soundVolume"
					:disabled="!enableSounds"
					max="1"
					step="0.1"
				/>
				<ui-button @click="soundTest"><fa icon="volume-up"/> {{ $t('@._settings.test') }}</ui-button>
			</section>

			<section>
				<ui-switch v-model="enableSpeech">{{ $t('@._settings.enable-speech') }}
					<template #desc>{{ $t('@._settings.enable-speech-desc') }}</template>
				</ui-switch>
			</section>
		</ui-card>

		<x-language/>
		<x-app-type/>
	</template>

	<template v-if="page == null || page == 'notification'">
		<x-notification/>
	</template>

	<template v-if="page == null || page == 'drive'">
		<x-drive/>
	</template>

	<template v-if="page == null || page == 'hashtags'">
		<ui-card>
			<template #title><fa icon="hashtag"/> {{ $t('@._settings.tags') }}</template>
			<section>
				<x-tags/>
			</section>
		</ui-card>
	</template>

	<template v-if="page == null || page == 'muteAndBlock'">
		<x-mute-and-block/>
	</template>

	<!--
	<template v-if="page == null || page == 'apps'">
		<ui-card>
			<template #title><fa icon="puzzle-piece"/> {{ $t('@._settings.apps') }}</template>
			<section>
				<x-apps/>
			</section>
		</ui-card>
	</template>
	-->

	<template v-if="page == null || page == 'security'">
		<ui-card>
			<template #title><fa icon="unlock-alt"/> {{ $t('@._settings.password') }}</template>
			<section>
				<x-password/>
			</section>
		</ui-card>

		<ui-card v-if="!$root.isMobile">
			<template #title><fa icon="mobile-alt"/> {{ $t('@.2fa') }}</template>
			<section>
				<x-2fa/>
			</section>
		</ui-card>

		<!--
		<ui-card>
			<template #title><fa icon="sign-in-alt"/> {{ $t('@._settings.signin') }}</template>
			<section>
				<x-signins/>
			</section>
		</ui-card>
		-->
	</template>

	<template v-if="page == null || page == 'api'">
		<x-api/>
	</template>

	<template v-if="page == null || page == 'other'">
		<ui-card>
			<template #title><fa icon="sync-alt"/> {{ $t('@._settings.update') }}</template>
			<section>
				<p>
					<span>{{ $t('@._settings.version') }} <i>{{ version }}</i></span>
					<template v-if="latestVersion !== undefined">
						<br>
						<span>{{ $t('@._settings.latest-version') }} <i>{{ latestVersion ? latestVersion : version }}</i></span>
					</template>
				</p>
				<ui-button @click="checkForUpdate" :disabled="checkingForUpdate">
					<template v-if="checkingForUpdate">{{ $t('@._settings.update-checking') }}<mk-ellipsis/></template>
					<template v-else>{{ $t('@._settings.do-update') }}</template>
				</ui-button>
			</section>
		</ui-card>

		<ui-card>
			<template #title><fa icon="cogs"/> {{ $t('@._settings.advanced-settings') }}</template>
			<section>
				<ui-switch v-model="debug">
					{{ $t('@._settings.debug-mode') }}<template #desc>{{ $t('@._settings.debug-mode-desc') }}</template>
				</ui-switch>
			</section>
		</ui-card>
	</template>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch} from 'vue-property-decorator';
import i18n from '../../../../i18n';
import X2fa from './2fa.vue';
import XApps from './apps.vue';
import XSignins from './signins.vue';
import XTags from './tags.vue';
import XIntegration from './integration.vue';
import XTheme from './theme.vue';
import XDrive from './drive.vue';
import XMuteAndBlock from './mute-and-block.vue';
import XPassword from './password.vue';
import XProfile from './profile.vue';
import XApi from './api.vue';
import XLanguage from './language.vue';
import XAppType from './app-type.vue';
import XNotification from './notification.vue';

import { url, version } from '../../../../config';
import checkForUpdate from '../../../scripts/check-for-update';
import { formatTimeString } from '../../../../../../misc/format-time-string';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { Meta } from '../../../../../../models/entities/meta';

@Component({
	i18n: i18n(),
	components: {
		X2fa,
		XApps,
		XSignins,
		XTags,
		XIntegration,
		XTheme,
		XDrive,
		XMuteAndBlock,
		XPassword,
		XProfile,
		XApi,
		XLanguage,
		XAppType,
		XNotification,
	},
})
export default class Settings extends Vue {
	@Prop() private readonly page: string | null;

	private meta: Meta;
	private version = version;
	private webSearchEngine = this.$store.state.settings.webSearchEngine;
	private pastedFileName = this.$store.state.settings.pastedFileName;
	private latestVersion: string;
	private checkingForUpdate = false;
	private tickerMode = localStorage.getItem('tickerMode') || '0';
	private visibilities = [
		'public',
		'home',
		'followers',
		'specified',
		'users',
		'local-public',
		'local-home',
		'local-followers',
	];
	private faSave = faSave;

	@Watch('tickerMode')
	public watchTickerMode(val) {
		localStorage.setItem('tickerMode', val);
	}

	public get useOsDefaultEmojis() { return this.$store.state.device.useOsDefaultEmojis; }
	public set useOsDefaultEmojis(value) { this.$store.commit('device/set', { key: 'useOsDefaultEmojis', value }); }

	public get reduceMotion() { return this.$store.state.device.reduceMotion; }
	public set reduceMotion(value) { this.$store.commit('device/set', { key: 'reduceMotion', value }); }

	public get keepCw() { return this.$store.state.settings.keepCw; }
	public set keepCw(value) { this.$store.commit('settings/set', { key: 'keepCw', value }); }

	public get navbar() { return this.$store.state.device.navbar; }
	public set navbar(value) { this.$store.commit('device/set', { key: 'navbar', value }); }

	public get deckColumnAlign() { return this.$store.state.device.deckColumnAlign; }
	public set deckColumnAlign(value) { this.$store.commit('device/set', { key: 'deckColumnAlign', value }); }

	public get deckColumnWidth() { return this.$store.state.device.deckColumnWidth; }
	public set deckColumnWidth(value) { this.$store.commit('device/set', { key: 'deckColumnWidth', value }); }

	public get enableSounds() { return this.$store.state.device.enableSounds; }
	public set enableSounds(value) { this.$store.commit('device/set', { key: 'enableSounds', value }); }

	public get enableSoundsInTimeline() { return this.$store.state.device.enableSoundsInTimeline; }
	public set enableSoundsInTimeline(value) { this.$store.commit('device/set', { key: 'enableSoundsInTimeline', value }); }

	public get enableSoundsInNotifications() { return this.$store.state.device.enableSoundsInNotifications; }
	public set enableSoundsInNotifications(value) { this.$store.commit('device/set', { key: 'enableSoundsInNotifications', value }); }

	public get enableSpeech() { return this.$store.state.device.enableSpeech; }
	public set enableSpeech(value) { this.$store.commit('device/set', { key: 'enableSpeech', value }); }

	public get soundVolume() { return this.$store.state.device.soundVolume; }
	public set soundVolume(value) { this.$store.commit('device/set', { key: 'soundVolume', value }); }

	public get debug() { return this.$store.state.device.debug; }
	public set debug(value) { this.$store.commit('device/set', { key: 'debug', value }); }

	public get alwaysShowNsfw() { return this.$store.state.device.alwaysShowNsfw; }
	public set alwaysShowNsfw(value) { this.$store.commit('device/set', { key: 'alwaysShowNsfw', value }); }

	public get postStyle() { return this.$store.state.device.postStyle; }
	public set postStyle(value) { this.$store.commit('device/set', { key: 'postStyle', value }); }

	public get disableViaMobile() { return this.$store.state.settings.disableViaMobile; }
	public set disableViaMobile(value) { this.$store.dispatch('settings/set', { key: 'disableViaMobile', value }); }

	public get useShadow() { return this.$store.state.device.useShadow; }
	public set useShadow(value) { this.$store.commit('device/set', { key: 'useShadow', value }); }

	public get roundedCorners() { return this.$store.state.device.roundedCorners; }
	public set roundedCorners(value) { this.$store.commit('device/set', { key: 'roundedCorners', value }); }

	public get lineWidth() { return this.$store.state.device.lineWidth; }
	public set lineWidth(value) { this.$store.commit('device/set', { key: 'lineWidth', value }); }

	public get fontSize() { return this.$store.state.device.fontSize; }
	public set fontSize(value) { this.$store.commit('device/set', { key: 'fontSize', value }); }

	public get fetchOnScroll() { return this.$store.state.settings.fetchOnScroll; }
	public set fetchOnScroll(value) { this.$store.dispatch('settings/set', { key: 'fetchOnScroll', value }); }

	public get rememberNoteVisibility() { return this.$store.state.settings.rememberNoteVisibility; }
	public set rememberNoteVisibility(value) { this.$store.dispatch('settings/set', { key: 'rememberNoteVisibility', value }); }

	public get defaultNoteVisibility() { return this.$store.state.settings.defaultNoteVisibility; }
	public set defaultNoteVisibility(value) { this.$store.dispatch('settings/set', { key: 'defaultNoteVisibility', value }); }

	public get useVisibilitySwitch() { return this.$store.state.settings.useVisibilitySwitch; }
	public set useVisibilitySwitch(value) { this.$store.dispatch('settings/set', { key: 'useVisibilitySwitch', value }); }

	public get homeNoteVisibility() { return this.$store.state.settings.homeNoteVisibility; }
	public set homeNoteVisibility(value) { this.$store.dispatch('settings/set', { key: 'homeNoteVisibility', value }); }

	public get localNoteVisibility() { return this.$store.state.settings.localNoteVisibility; }
	public set localNoteVisibility(value) { this.$store.dispatch('settings/set', { key: 'localNoteVisibility', value }); }

	public get hybridNoteVisibility() { return this.$store.state.settings.hybridNoteVisibility; }
	public set hybridNoteVisibility(value) { this.$store.dispatch('settings/set', { key: 'hybridNoteVisibility', value }); }

	public get globalNoteVisibility() { return this.$store.state.settings.globalNoteVisibility; }
	public set globalNoteVisibility(value) { this.$store.dispatch('settings/set', { key: 'globalNoteVisibility', value }); }

	public get pasteDialog() { return this.$store.state.settings.pasteDialog; }
	public set pasteDialog(value) { this.$store.dispatch('settings/set', { key: 'pasteDialog', value }); }

	public get showReplyTarget() { return this.$store.state.settings.showReplyTarget; }
	public set showReplyTarget(value) { this.$store.dispatch('settings/set', { key: 'showReplyTarget', value }); }

	public get showMyRenotes() { return this.$store.state.settings.showMyRenotes; }
	public set showMyRenotes(value) { this.$store.dispatch('settings/set', { key: 'showMyRenotes', value }); }

	public get showRenotedMyNotes() { return this.$store.state.settings.showRenotedMyNotes; }
	public set showRenotedMyNotes(value) { this.$store.dispatch('settings/set', { key: 'showRenotedMyNotes', value }); }

	public get showLocalRenotes() { return this.$store.state.settings.showLocalRenotes; }
	public set showLocalRenotes(value) { this.$store.dispatch('settings/set', { key: 'showLocalRenotes', value }); }

	public get showPostFormOnTopOfTl() { return this.$store.state.settings.showPostFormOnTopOfTl; }
	public set showPostFormOnTopOfTl(value) { this.$store.dispatch('settings/set', { key: 'showPostFormOnTopOfTl', value }); }

	public get suggestRecentHashtags() { return this.$store.state.settings.suggestRecentHashtags; }
	public set suggestRecentHashtags(value) { this.$store.dispatch('settings/set', { key: 'suggestRecentHashtags', value }); }

	public get showClockOnHeader() { return this.$store.state.settings.showClockOnHeader; }
	public set showClockOnHeader(value) { this.$store.dispatch('settings/set', { key: 'showClockOnHeader', value }); }

	public get circleIcons() { return this.$store.state.settings.circleIcons; }
	public set circleIcons(value) {
		this.$store.dispatch('settings/set', { key: 'circleIcons', value });
		this.reload();
	}

	public get contrastedAcct() { return this.$store.state.settings.contrastedAcct; },
	public set contrastedAcct(value) {
		this.$store.dispatch('settings/set', { key: 'contrastedAcct', value });
		this.reload();
	}

	public get showFullAcct() { return this.$store.state.settings.showFullAcct; },
	public set showFullAcct(value) {
		this.$store.dispatch('settings/set', { key: 'showFullAcct', value });
		this.reload();
	}

	public get showVia() { return this.$store.state.settings.showVia; }
	public set showVia(value) { this.$store.dispatch('settings/set', { key: 'showVia', value }); }

	public get iLikeSushi() { return this.$store.state.settings.iLikeSushi; }
	public set iLikeSushi(value) { this.$store.dispatch('settings/set', { key: 'iLikeSushi', value }); }

	public get roomUseOrthographicCamera() { return this.$store.state.device.roomUseOrthographicCamera; }
	public set roomUseOrthographicCamera(value) { this.$store.commit('device/set', { key: 'roomUseOrthographicCamera', value }); }

	public get roomGraphicsQuality() { return this.$store.state.device.roomGraphicsQuality; }
	public set roomGraphicsQuality(value) { this.$store.commit('device/set', { key: 'roomGraphicsQuality', value }); }

	public get games_reversi_showBoardLabels() { return this.$store.state.settings.gamesReversiShowBoardLabels; }
	public set games_reversi_showBoardLabels(value) { this.$store.dispatch('settings/set', { key: 'gamesReversiShowBoardLabels', value }); }

	public get games_reversi_useAvatarStones() { return this.$store.state.settings.gamesReversiUseAvatarStones; }
	public set games_reversi_useAvatarStones(value) { this.$store.dispatch('settings/set', { key: 'gamesReversiUseAvatarStones', value }); }

	public get disableAnimatedMfm() { return this.$store.state.settings.disableAnimatedMfm; }
	public set disableAnimatedMfm(value) { this.$store.dispatch('settings/set', { key: 'disableAnimatedMfm', value }); }

	public get disableShowingAnimatedImages() { return this.$store.state.device.disableShowingAnimatedImages; }
	public set disableShowingAnimatedImages(value) { this.$store.commit('device/set', { key: 'disableShowingAnimatedImages', value }); }

	public get remainDeletedNote() { return this.$store.state.settings.remainDeletedNote; }
	public set remainDeletedNote(value) { this.$store.dispatch('settings/set', { key: 'remainDeletedNote', value }); }

	public get mobileNotificationPosition() { return this.$store.state.device.mobileNotificationPosition; }
	public set mobileNotificationPosition(value) { this.$store.commit('device/set', { key: 'mobileNotificationPosition', value }); }

	public get enableMobileQuickNotificationView() { return this.$store.state.device.enableMobileQuickNotificationView; }
	public set enableMobileQuickNotificationView(value) { this.$store.commit('device/set', { key: 'enableMobileQuickNotificationView', value }); }

	public get homeProfile() { return this.$store.state.device.homeProfile; }
	public set homeProfile(value) { this.$store.commit('device/set', { key: 'homeProfile', value }); }

	public get mobileHomeProfile() { return this.$store.state.device.mobileHomeProfile; }
	public set mobileHomeProfile(value) { this.$store.commit('device/set', { key: 'mobileHomeProfile', value }); }

	public get deckProfile() { return this.$store.state.device.deckProfile; }
	public set deckProfile(value) { this.$store.commit('device/set', { key: 'deckProfile', value }); }

	public created() {
		this.$root.getMeta().then(meta => {
			this.meta = meta;
		});
	}

	public reload() {
		this.$root.dialog({
			type: 'warning',
			text: this.$t('@.reload-to-apply-the-setting'),
			showCancelButton: true
		}).then(({ canceled }) => {
			if (!canceled) {
				location.reload();
			}
		});
	}

	public save(key, value) {
		this.$store.dispatch('settings/set', {
			key,
			value
		}).then(() => {
			this.$root.dialog({
				type: 'success',
				text: this.$t('@._settings.saved')
			});
		});
	}

	public customizeHome() {
		location.href = '/?customize';
	}

	public updateWallpaper() {
		this.$chooseDriveFile({
			multiple: false
		}).then(file => {
			this.$store.dispatch('settings/set', { key: 'wallpaper', value: file.url });
		});
	}

	public deleteWallpaper() {
		this.$store.dispatch('settings/set', { key: 'wallpaper', value: null });
	}

	public checkForUpdate() {
		this.checkingForUpdate = true;
		checkForUpdate(this.$root, true, true).then(newer => {
			this.checkingForUpdate = false;
			this.latestVersion = newer;
			if (newer == null) {
				this.$root.dialog({
					title: this.$t('@._settings.no-updates'),
					text: this.$t('@._settings.no-updates-desc')
				});
			} else {
				this.$root.dialog({
					title: this.$t('@._settings.update-available'),
					text: this.$t('@._settings.update-available-desc')
				});
			}
		});
	}

	public soundTest() {
		const sound = new Audio(`${url}/assets/message.mp3`);
		sound.volume = this.$store.state.device.soundVolume;
		sound.play();
	}

	public pastedFileNamePreview() {
		return `${formatTimeString(new Date(), this.pastedFileName).replace(/{{number}}/g, `1`)}.png`;
	}
}
</script>
