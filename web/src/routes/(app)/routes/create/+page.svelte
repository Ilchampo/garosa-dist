<script lang="ts">
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import type { PointInterface } from '$lib/server/interfaces/pointInterface';
	import type { PermissionInterface } from '$lib/server/interfaces/permissionInterface';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';

	import { Modals } from '$lib/enums';
	import { modalStore, tooltip } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	import ModalPointRead from '$lib/components/point/ModalPointRead.svelte';

	export let data: PageData;
	export let form: ActionData;

	let perms: PermissionInterface | null = null;
	let distPointIds: number[] = [];

	onMount(async () => {
		if (data.user) {
			perms = data.user as PermissionInterface;
		}
	});

	function openModal(option: Modals, point?: PointInterface): void {
		let component: ModalComponent;
		let settings: ModalSettings;

		switch (option) {
			case Modals.READ:
				component = { ref: ModalPointRead };
				settings = { type: 'component', component, meta: { point } };
				modalStore.trigger(settings);
				break;
		}
	}
</script>

<div class="card card-content">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="truck" width="w-14" height="h-14" fill="fill-secondary-500" />
			<div>
				<h2>Create Distribution Routes</h2>
				<em>Create a new distribution route for the system</em>
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
				<a href="/routes" use:tooltip={{ content: 'Back to Distribution Points', position: 'left' }}>
					<button class="btn-icon btn-filled-tertiary">
						<span> <SvgIcon name="check" width="w-8" height="h-6" fill="fill-tertiary-100" /> </span>
					</button></a
				>
			</div>
		{/if}

		<form
			use:enhance={({ form, data, action, cancel }) => {
				console.log('Reached');
			}}
			method="POST"
		>
			<div class="grid grid-cols-2 gap-4">
				<div class="card">
					<div class="card-header">
						<div class="flex flex-row items-center gap-4">
							<SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-secondary-500" />
							<div>
								<h3>Distribution Points</h3>
								<em>Select the distribution points</em>
							</div>
						</div>
						<hr class="!border-t-2 my-4" />
					</div>
					<div class="card-content">
						{#if data.payload}
							<div class="route-point_grid">
								<fieldset>
									<div class="input-label">
										<div class="space-y-2">
											{#each data.payload.points as point}
												<label for="routePoints" class="route-point_item">
													<input type="checkbox" value={point.id} bind:group={distPointIds} />
													<img
														src={point.pointImage}
														alt={point.pointName}
														class="card-table_image"
													/>
													<div class="flex flex-col justify-between">
														<div
															class="text-link"
															on:click={() => {
																openModal(Modals.READ, point);
															}}
															on:keydown
														>
															{point.pointName}
														</div>
														<p>{point.pointDescription}</p>
													</div>
												</label>
												<hr class="divide-y" />
											{/each}
										</div>
									</div>
								</fieldset>
							</div>
						{/if}
					</div>
					<div class="card-footer" />
				</div>

				<div class="card">
					<div class="card-header">
						<div class="flex flex-row items-center gap-4">
							<SvgIcon name="road" width="w-14" height="h-14" fill="fill-secondary-500" />
							<div>
								<h3>Route Information</h3>
								<em>Complete the following information</em>
							</div>
						</div>
						<hr class="!border-t-2 my-4" />
					</div>
					<div class="card-body">
						{#if data.payload}
							<label for="distributorId" class="flex-1 my-2">
								<span>Distributor</span>
								<select name="distributorId" id="distributorId" required>
									{#each data.payload.distributors as distributor}
										<option value={distributor.id}
											>{distributor.firstName} {distributor.lastName}</option
										>
									{/each}
								</select>
							</label>
							<label for="routeTitle" class="flex-1 my-2">
								<span>Distribution Route Title</span>
								<input type="text" name="routeTitle" id="routeTitle" minlength="1" required />
							</label>
							<label for="routeDescription" class="flex-1 my-2">
								<span>Distribution Route Description</span>
								<input
									type="text"
									name="routeDescription"
									id="routeDescription"
									minlength="1"
									required
								/>
							</label>
							<input type="text" name="routePoints" id="routePoints" value={distPointIds} hidden />
						{/if}
					</div>
					<div class="card-footer">
						<hr class="!border-t-2 my-4" />
						<button type="submit" class="btn btn-filled-tertiary w-full" disabled={!perms?.createRoute}
							>Create Distribution Route</button
						>
					</div>
				</div>
			</div>
		</form>
	</div>

	<!-- Footer -->
	<div class="card-footer">
		<hr class="!border-t-2 my-4" />
		<a href="/routes" use:tooltip={{ content: 'Back to Distribution Routes', position: 'right' }}>
			<button class="btn-icon btn-filled-surface">
				<span> <SvgIcon name="arrow-left" width="w-8" height="h-6" fill="fill-surface-100" /> </span>
			</button>
		</a>
	</div>
</div>
