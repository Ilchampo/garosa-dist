<script lang="ts">
	import type { PermissionInterface } from '$lib/server/interfaces/permissionInterface';
	import type { PageData } from './$types';
    import type { ActionData } from './$types';

	import { enhance } from '$app/forms';
	import { tooltip } from '@skeletonlabs/skeleton';

	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';

	export let data: PageData;
    export let form: ActionData;

	let distPointIds: number[] = [];
</script>

<div class="card card-content">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="truck" width="w-14" height="h-14" fill="fill-primary-400" />
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
        <div class="flex bg-primary-500/50 border border-primary-500 p-4 mb-4 justify-between items-center">
            <div class="flex">
                <SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-primary-400" />
                <div class="flex flex-col ml-4">
                    <h3>{form.request.msg}</h3>
                </div>
            </div>
            <a href="/routes">
                <button
                    class="btn-icon btn-filled-secondary"
                    use:tooltip={{ content: 'Back to Distribution Points', position: 'left' }}
                >
                    <span> <SvgIcon name="check" width="w-8" height="h-6" fill="fill-primary-400" /> </span>
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
							<SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-primary-400" />
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
														<b>{point.pointName}</b>
														<p>{point.pointDescription}</p>
													</div>
												</label>
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
							<SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-primary-400" />
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
						<button type="submit" class="btn btn-filled-secondary w-full">Create Distribution Route</button>
					</div>
				</div>
			</div>
		</form>
	</div>

	<!-- Footer -->
	<div class="card-footer">
		<hr class="!border-t-2 my-4" />
		<a href="/routes">
			<button
				class="btn-icon btn-filled-primary"
				use:tooltip={{ content: 'Back to Distribution Points', position: 'right' }}
			>
				<span> <SvgIcon name="arrow-left" width="w-8" height="h-6" fill="fill-primary-400" /> </span>
			</button>
		</a>
	</div>
</div>
