<script>
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import { Modal } from '@skeletonlabs/skeleton';
	
	import Header from '$lib/components/global/Header.svelte';
	import SideBar from '$lib/components/global/SideBar.svelte';
</script>

<Modal />

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<SideBar />
	</svelte:fragment>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<div class="w-full h-full flex flex-col p-4 relative">
		<slot />
	</div>
</AppShell>
