<script lang="ts">
	import type { PointInterface } from '$lib/server/interfaces/pointInterface';

	import { modalStore } from '@skeletonlabs/skeleton';

	import EmbeddedMap from '$lib/components/global/EmbeddedMap.svelte';
	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';

	export let parent: any;

	const data = $modalStore[0].meta.point as PointInterface;
</script>

<div class="card">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-primary-400" />
			<div>
				<h2>{data.pointName}</h2>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	<!-- Body -->
	<div class="card-body">
		<div class="flex">
			<img src={data.pointImage} alt={data.pointName} class="point-image_read" />
			<div class="flex flex-col justify-between ml-4">
				<h3>{data.pointDescription}</h3>
				<b>Created on: {data.createdOn}</b>
				<b>Updated on: {data.updatedOn}</b>
			</div>
		</div>

		<!-- Google Maps -->
		<div class="py-4">
			<EmbeddedMap latitude={data.latitude} longitude={data.longitude} />
		</div>
	</div>

	<!-- Footer -->
	<div class="card-footer">
		<hr class="!border-t-2 my-4" />
		<div class="flex justify-end">
			<button type="submit" class="btn btn-filled-secondary w-40" on:click={parent.onClose}>Close</button>
		</div>
	</div>
</div>
