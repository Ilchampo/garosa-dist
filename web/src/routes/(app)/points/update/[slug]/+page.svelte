<script lang="ts">
	import type { PermissionInterface } from '$lib/server/interfaces/permissionInterface';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';

	import { enhance } from '$app/forms';
	import { tooltip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	import Loader from '$lib/components/global/Loader.svelte';
	import EmbeddedMap from '$lib/components/global/EmbeddedMap.svelte';

	export let data: PageData;
	export let form: ActionData;

	let perms: PermissionInterface | null = null;
	let isLoading = true;

	onMount(async () => {
		if (data.payload.point) {
			isLoading = false;
			perms = data.payload.user as PermissionInterface;
		}
	});
</script>

<div class="card card-container">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-secondary-500" />
			<div>
				<h2>Update Distribution Point</h2>
				<em>Complete the following information to update the distribution point</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	<!-- Body -->
	<div class="card-body">
		{#if isLoading}
			<Loader />
		{:else}
			{#if form}
				<div class="flex bg-surface-500/20 border border-surface-500 p-4 mb-4 justify-between items-center">
					<div class="flex items-center">
						<SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-surface-400" />
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
			<form use:enhance method="POST">
				<div class="grid grid-cols-2 gap-4">
					<EmbeddedMap
						latitude={data.payload.point.latitude}
						longitude={data.payload.point.longitude}
						height="600px"
					/>
					<div class="card">
						<div class="card-header">
							<div class="flex flex-row items-center gap-4">
								<img
									src={data.payload.point.pointImage}
									alt={data.payload.point.pointName}
									class="point-image_read"
								/>
								<div class="flex flex-col justify-between">
									<h2>{data.payload.point.pointName}</h2>
									<span
										><b>Created On:</b>
										{new Date(data.payload.point.createdOn).toLocaleString('en-GB')}</span
									>
									<span
										><b>Updated On:</b>
										{new Date(data.payload.point.updatedOn).toLocaleString('en-GB')}</span
									>
								</div>
							</div>
							<hr class="!border-t-2 my-4" />
						</div>
						<div class="card-body">
							<label for="pointName" class="flex-1 my-2">
								<span>Distribution Point Name</span>
								<input
									type="text"
									name="pointName"
									id="pointName"
									minlength="1"
									required
									value={data.payload.point.pointName}
								/>
							</label>
							<label for="pointDescription" class="flex-1 my-2">
								<span>Distribution Point Description</span>
								<input
									type="text"
									name="pointDescription"
									id="pointDescription"
									minlength="1"
									required
									value={data.payload.point.pointDescription}
								/>
							</label>
							<label for="pointImage" class="flex-1 my-2">
								<span>Distribution Point Image</span>
								<input type="file" name="pointImage" id="pointImage" />
							</label>
							<input
								type="text"
								name="currentImage"
								id="currentImage"
								value={data.payload.point.pointImage}
								hidden
							/>
							<input type="number" name="id" id="id" value={data.payload.point.id} hidden />
							<input
								type="text"
								name="latitude"
								id="latitude"
								value={data.payload.point.latitude}
								hidden
							/>
							<input
								type="text"
								name="longitude"
								id="longitude"
								value={data.payload.point.longitude}
								hidden
							/>
						</div>
						<div class="card-footer">
							<hr class="!border-t-2 my-4" />
							<button
								type="submit"
								class="btn btn-filled-tertiary w-full"
								disabled={!perms?.updatePointById}>Update Distribution Point</button
							>
						</div>
					</div>
				</div>
			</form>
		{/if}
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
