<script lang="ts">
	export let parent: any;
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { PointInterface } from '$lib/interfaces/pointInterface';
	const pointData = $modalStore[0].meta.point as PointInterface;
</script>

<div class="card flex-col justify-center">
	<div class="card-header">
		<div class="flex items-center">
			<img src={pointData.pointImage} alt={pointData.pointName} class="point_image">
			<div class="flex-col ml-4">
				<h2>{pointData.pointName}</h2>
				<p>{pointData.pointDescription}</p>
				<em>{pointData.latitude} {pointData.longitude}</em>
			</div>
		</div>
	</div>

	<div class="map-content">
		<iframe
			title={pointData.pointName}
			width="100%"
			height="450"
			style="border-radius:1rem"
			loading="lazy"
			src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBezSyDx58XcmWt4XBNuuXrVLMN0GP8xVg
				&q={pointData.latitude},{pointData.longitude}">
		</iframe>
	</div>

	<div class="card-footer flex justify-center">
		<button class="btn btn-filled-secondary btn-base" on:click={parent.onClose}>Close</button>
	</div>
</div>
