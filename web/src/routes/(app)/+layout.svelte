<script>
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import Header from '../../components/common/Header.svelte';
	import SideBar from '../../components/common/SideBar.svelte';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
</script>

<Modal />

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<SideBar />
	</svelte:fragment>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<div class="content">
		<slot />
	</div>
</AppShell>

<style>
	.content {
		display: flex;
		height: 100%;
		padding: 1rem;
		overflow-y: scroll;
	}
</style>
