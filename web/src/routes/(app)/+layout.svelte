<script>
	import '../../theme.postcss'; // <--
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../../app.postcss';
	import { page } from '$app/stores';

	import { AppShell } from '@skeletonlabs/skeleton';
	import { Modal } from '@skeletonlabs/skeleton';

	import { fade } from 'svelte/transition';
	import Header from '$lib/components/global/Header.svelte';
	import SideBar from '$lib/components/global/SideBar.svelte';
</script>

<Modal />

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<SideBar />
	</svelte:fragment>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	{#key $page}
		<div class="w-full h-full flex flex-col p-4 relative" in:fade={{ delay: 300 }}  >
			<slot />
		</div>
	{/key}
</AppShell>
