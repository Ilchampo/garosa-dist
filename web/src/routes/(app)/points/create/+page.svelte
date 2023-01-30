<script lang="ts">
	import type { PermissionInterface } from '$lib/server/interfaces/permissionInterface';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';

	import { appConfig } from '$lib/config';
	import { enhance } from '$app/forms';
	import { tooltip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import EmbeddedMap from '$lib/components/global/EmbeddedMap.svelte';
	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';

	export let data: PageData;
	export let form: ActionData;

	let perms: PermissionInterface | null = null;

	onMount(async () => {
		if (data) {
			perms = data as PermissionInterface;
		}
	});

	const test: string = 'Test';
</script>

<svelte:head>
	<script
		async
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBezSyDx58XcmWt4XBNuuXrVLMN0GP8xVg&libraries=places&callback=initAutoComplete"
	></script>
	<script>
		let autocomplete, lat, lng;

		function initAutoComplete() {
			autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {
				types: ['establishment'],
				componentRestrictions: { country: ['EC'] },
				fields: ['geometry', 'name']
			});
			autocomplete.addListener('place_changed', onPlaceChanged);
		}

		function onPlaceChanged() {
			var place = autocomplete.getPlace();
			if (!place.geometry) {
				document.getElementById('autocomplete').placeholder = 'Enter a establishment';
			} else {
				// Update Variables
				lat = place.geometry.location.lat();
				lng = place.geometry.location.lng();
				// Update Document Values
				document.getElementById('latitude').value = place.geometry.location.lat();
				document.getElementById('longitude').value = place.geometry.location.lng();
				document.getElementById('pointName').value = place.name;
				document.getElementById(
					'googleMaps'
				).src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBezSyDx58XcmWt4XBNuuXrVLMN0GP8xVg&q=${place.geometry.location.lat()},${place.geometry.location.lng()}`;
			}
		}
	</script>
</svelte:head>

<div class="card card-container">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-secondary-500" />
			<div>
				<h2>Create Distribution Point</h2>
				<em>Create a new distribution point for the system</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	<!-- Body -->
	<div class="card-body">
		<!-- Form Banner -->
		{#if form}
			<div class="flex bg-surface-500/20 border border-surface-500 p-4 mb-4 justify-between items-center">
				<div class="flex items-center">
					<SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-surface-500" />
					<div class="flex flex-col ml-4">
						<h3>{form.request.msg}</h3>
					</div>
				</div>
				<a href="/points" use:tooltip={{ content: 'Back to Distribution Points', position: 'left' }}>
					<button class="btn-icon btn-filled-tertiary">
						<span> <SvgIcon name="check" width="w-8" height="h-6" fill="fill-tertiary-100" /> </span>
					</button></a
				>
			</div>
		{/if}

		<!-- Create Form -->
		<form use:enhance method="POST">
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col gap-4">
					<input type="text" id="autocomplete" placeholder="Search For Establishment" />
					<!-- <EmbeddedMap latitude={0} longitude={0} height="500px" /> -->

					<iframe
						id="googleMaps"
						title="Google Maps"
						width="100%"
						height="500px"
						style="border-radius: 0.5rem"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						src="https://www.google.com/maps/embed/v1/place?key={appConfig.key}&q=-0.1628905,-78.4616573"
					/>
				</div>
				<div class="card">
					<div class="card-header">
						<div class="flex flex-row items-center gap-4">
							<SvgIcon name="plus" width="w-14" height="h-14" fill="fill-secondary-500" />
							<div>
								<h2>Distribution Point Form</h2>
								<em>Complete the following information to create the distribution point</em>
							</div>
						</div>
						<hr class="!border-t-2 my-4" />
					</div>
					<div class="card-body">
						<label for="pointName" class="flex-1 my-2">
							<span>Distribution Point Name</span>
							<input type="text" name="pointName" id="pointName" minlength="1" required />
						</label>
						<label for="pointDescription" class="flex-1 my-2">
							<span>Distribution Point Description</span>
							<input type="text" name="pointDescription" id="pointDescription" minlength="1" required />
						</label>
						<label for="pointImage" class="flex-1 my-2">
							<span>Distribution Point Image</span>
							<input type="file" name="pointImage" id="pointImage" />
						</label>
						<input type="text" id="latitude" name="latitude" hidden />
						<input type="text" id="longitude" name="longitude" hidden />
					</div>
					<div class="card-footer">
						<hr class="!border-t-2 my-4" />
						<button type="submit" class="btn btn-filled-tertiary w-full" disabled={!perms?.createPoint}
							>Create Distribution Point</button
						>
					</div>
				</div>
			</div>
		</form>
	</div>

	<!-- Footer -->
	<div class="card-footer">
		<hr class="!border-t-2 my-4" />
		<a href="/points" use:tooltip={{ content: 'Back to Distribution Points', position: 'right' }}>
			<button class="btn-icon btn-filled-surface">
				<span> <SvgIcon name="arrow-left" width="w-8" height="h-6" fill="fill-surface-100" /> </span>
			</button>
		</a>
	</div>
</div>
