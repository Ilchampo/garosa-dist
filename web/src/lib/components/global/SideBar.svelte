<script lang="ts">
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	const storeValue: Writable<number> = writable(1);
</script>

<AppRail selected={storeValue} width="w-12">
	<AppRailTile tag="a" href="/" value={1}>
		<SvgIcon name="house" width="w-6" height="h-6" fill="fill-primary-400" />
	</AppRailTile>

	<AppRailTile tag="a" href="/users" value={2}>
		<SvgIcon name="user-group" width="w-6" height="h-6" fill="fill-primary-400" />
	</AppRailTile>

	<AppRailTile tag="a" href="/roles" value={3}>
		<SvgIcon name="shield-halved" width="w-6" height="h-6" fill="fill-primary-400" />
	</AppRailTile>

	<AppRailTile tag="a" href="/points" value={4}>
		<SvgIcon name="location-dot" width="w-6" height="h-6" fill="fill-primary-400" />
	</AppRailTile>

	<AppRailTile tag="a" href="/routes" value={5}>
		<SvgIcon name="truck" width="w-6" height="h-6" fill="fill-primary-400" />
	</AppRailTile>

	<AppRailTile tag="a" href="/logs" value={6}>
		<SvgIcon name="clipboard" width="w-6" height="h-6" fill="fill-primary-400" />
	</AppRailTile>

	<AppRailTile tag="a" href="/settings" value={7}>
		<SvgIcon name="gear" width="w-6" height="h-6" fill="fill-primary-400" />
	</AppRailTile>

	<svelte:fragment slot="trail">
		<AppRailTile tag="a" href="/signin">
			<SvgIcon name="right-to-bracket" width="w-6" height="h-6" fill="fill-primary-400" />
		</AppRailTile>
	</svelte:fragment>
</AppRail>
