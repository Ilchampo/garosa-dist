<script lang="ts">
	import type { PageData } from './$types';
	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	export let data: PageData;
</script>

<div class="card card-container">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="house" width="w-14" height="h-14" fill="fill-secondary-500" />
			<div>
				<h2>Dashboard Panel</h2>
				<em>Welcome to your user dashboard</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	<!-- Body -->
	<div class="card-body">
		<h3>It's great to see you again, {data.payload.user.firstName} {data.payload.user.lastName}.</h3>
		<em>Today's date is {new Date(Date.now()).toLocaleString('en-GB')}</em>

		<div class="flex gap-4 justify-between w-full items-center">
			{#if data.payload.userRoutes.length > 0}
				<div class="flex w-full gap-4 justify-center bg-secondary-500 p-10 rounded-xl items-center my-4">
					<h4>You currently have {data.payload.userRoutes.length} routes created</h4>
					<a href="/routes/"><button class="btn btn-filled-tertiary">Check My Routes</button></a>
				</div>
			{:else}
				<div class="flex w-full gap-4 justify-center bg-secondary-500 p-10 rounded-xl items-center my-4">
					<h4>You don't have any route created yet</h4>
					<a href="/routes/create"><button class="btn btn-filled-tertiary">Create New Route</button></a>
				</div>
			{/if}
		</div>
	</div>

	<!-- Footer -->
	<div class="card-footer">
		<hr class="!border-t-2 my-4" />
	</div>
</div>
