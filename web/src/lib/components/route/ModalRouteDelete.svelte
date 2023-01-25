<script lang="ts">
    import type { RouteInterface } from '$lib/server/interfaces/routeInterface';

    import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	import { Alert } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { modalStore } from '@skeletonlabs/skeleton';
	export let parent: any;
	const data = $modalStore[0].meta.route as RouteInterface;
</script>

<div class="card">
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="truck" width="w-14" height="h-14" fill="fill-secondary-500" />
			<div>
				<h2>Delete Distribution Route</h2>
				<em>Are you sure you want to delete route?</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	<form use:enhance method="POST" action="/routes?/delete">
		<div class="card-body">
			<Alert color="bg-warning-500">
				<svelte:fragment slot="lead">
					<SvgIcon name="warning" width="w-20" height="h-20" fill="fill-warning-100" />
				</svelte:fragment>
				<svelte:fragment slot="title">Warning!</svelte:fragment>
				<span
					>This actions will have as consequence delete the route <b>{data.routeTitle}</b> from the
					system!</span
				>
			</Alert>
			<input type="number" name="routeId" value={data.id} hidden />
		</div>

		<div class="card-footer">
			<hr class="!border-t-2 my-4" />
			<div class="flex gap-4 justify-end">
				<button type="button" class="btn btn-filled-surface w-40" on:click={parent.onClose}>Cancel</button>
				<button type="submit" class="btn btn-filled-tertiary w-40" on:click={parent.onClose}>Delete</button>
			</div>
		</div>
	</form>
</div>