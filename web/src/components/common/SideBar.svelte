<script lang="ts">
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { tooltip } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import SvgIcon from '../SvgIcon/SvgIcon.svelte';
	const storeValue: Writable<number> = writable(1);
</script>

<AppRail selected={storeValue}>
	<!-- AppRailTile List -->
	<AppRailTile tag="a" href="/" >
		<SvgIcon name="home" width="w-10" height="h-10" fill="fill-primary-500" />
	</AppRailTile>
	<!-- AppRailTile List -->

	<svelte:fragment slot="trail">
	</svelte:fragment>
</AppRail>
