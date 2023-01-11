<script>
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import Header from '../../components/common/Header.svelte';
	import SideBar from '../../components/common/SideBar.svelte';
	import { Modal } from '@skeletonlabs/skeleton';
</script>

<Modal />

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<SideBar />
	</svelte:fragment>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<slot />
</AppShell>
