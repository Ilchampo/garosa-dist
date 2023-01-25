<script lang="ts">
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import { enhance } from '$app/forms';
	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	const storeValue: Writable<number> = writable(0);
</script>

<AppRail selected={storeValue} width="w-12">
	<AppRailTile tag="a" href="/" value={1}>
		<SvgIcon name="house" width="w-6" height="h-6" fill="fill-secondary-500" />
	</AppRailTile>

	<AppRailTile tag="a" href="/users" value={2}>
		<SvgIcon name="user-group" width="w-6" height="h-6" fill="fill-secondary-500" />
	</AppRailTile>

	<AppRailTile tag="a" href="/roles" value={3}>
		<SvgIcon name="shield-halved" width="w-6" height="h-6" fill="fill-secondary-500" />
	</AppRailTile>

	<AppRailTile tag="a" href="/points" value={4}>
		<SvgIcon name="location-dot" width="w-6" height="h-6" fill="fill-secondary-500" />
	</AppRailTile>

	<AppRailTile tag="a" href="/routes" value={5}>
		<SvgIcon name="truck" width="w-6" height="h-6" fill="fill-secondary-500" />
	</AppRailTile>

	<AppRailTile tag="a" href="/logs" value={6}>
		<SvgIcon name="clipboard" width="w-6" height="h-6" fill="fill-secondary-500" />
	</AppRailTile>

	<AppRailTile tag="a" href="/settings" value={7}>
		<SvgIcon name="gear" width="w-6" height="h-6" fill="fill-secondary-500" />
	</AppRailTile>

	<svelte:fragment slot="trail">
		<AppRailTile>
			<form use:enhance method="POST" action="/users?/signout">
				<button type="submit">
					<SvgIcon name="right-to-bracket" width="w-6" height="h-6" fill="fill-secondary-500" />
				</button>
			</form>
		</AppRailTile>
	</svelte:fragment>
</AppRail>
