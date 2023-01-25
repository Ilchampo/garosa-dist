<script lang="ts">
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import type { RouteInterface } from '$lib/server/interfaces/routeInterface';
	import type { PermissionInterface } from '$lib/server/interfaces/permissionInterface';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';

	import { Modals } from '$lib/enums';
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { tableInteraction, tableA11y, Paginator } from '@skeletonlabs/skeleton';
	import { modalStore, tooltip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	import Loader from '$lib/components/global/Loader.svelte';

	export let data: PageData;
	export let form: ActionData;

	let perms: PermissionInterface | null = null;
	let isLoading = true;
	let isPopulated = false;

	onMount(async () => {
		perms = data.payload.user as PermissionInterface;
		isPopulated = data.payload.routes.length > 0;
		isLoading = false;
	});

	const pagination = { offset: 0, limit: 5, size: 0, amounts: [5, 7, 10] };
	const dataTableStore = createDataTableStore(data.payload.routes as RouteInterface[], {
		search: '',
		sort: '',
		pagination
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));

	function clearSearchParams(): void {
		$dataTableStore.search = '';
	}
</script>

<div class="card card-container">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="truck" width="w-14" height="h-14" fill="fill-primary-400" />
			<div>
				<h2>Routes Panel</h2>
				<em>List of distribution routes on the system</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	{#if isLoading}
		<Loader />
	{:else}
		<!-- Body -->
		<div class="card-body">
			{#if form}
				<div class="flex bg-primary-500/50 border border-primary-500 p-4 mb-4 justify-between items-center">
					<div class="flex">
						<SvgIcon name="user" width="w-14" height="h-14" fill="fill-primary-400" />
						<div class="flex flex-col ml-4"><h3>{form.request.msg}</h3></div>
					</div>
					<button
						class="btn-icon btn-filled-secondary"
						use:tooltip={{ content: 'Dismiss', position: 'left' }}
						on:click={() => {
							location.reload();
						}}
					>
						<span> <SvgIcon name="check" width="w-8" height="h-6" fill="fill-primary-400" /> </span>
					</button>
				</div>
			{/if}

			<div class="card-table">
				<!-- Table Search Bar -->
				<div class="card-table_bar">
					<div class="flex flex-1">
						<button on:click={clearSearchParams} class="btn btn-filled-surface btn-base">Clear</button>
						<input
							bind:value={$dataTableStore.search}
							type="search"
							placeholder="Search Distribution Route..."
						/>
					</div>
					<a href="/routes/create">
						<button
							class="btn-icon btn-filled-primary"
							disabled={!perms?.createUser}
							use:tooltip={{ content: 'Create Distribution Route', position: 'left' }}
						>
							<span> <SvgIcon name="plus" width="w-8" height="h-6" fill="fill-primary-400" /> </span>
						</button>
					</a>
					<button
						class="btn-icon btn-filled-secondary"
						use:tooltip={{ content: 'Reload', position: 'left' }}
						on:click={() => {
							location.reload();
						}}
					>
						<span> <SvgIcon name="reload" width="w-8" height="h-6" fill="fill-primary-400" /> </span>
					</button>
				</div>

				{#if !isPopulated}
					<div class="card-table_empty">
						<SvgIcon name="magnifying-glass" width="w-60" height="h-60" fill="fill-primary-400" />
						<h1>{data.payload.message}</h1>
						<p>Currently there are not distribution routes available!</p>
					</div>
				{:else}
					<!-- Table Content -->
					<div class="card-table_content">
						<table class="table" role="grid" use:tableInteraction use:tableA11y>
							<thead
								on:click={(e) => {
									dataTableStore.sort(e);
								}}
								on:keypress
							>
								<tr>
									<th>Route Title</th>
									<th>Route Description</th>
									<th data-sort="routeStatus">Route Status</th>
									<th data-sort="startTime">Start Time</th>
									<th data-sort="endTime">End Time</th>
									<th data-sort="createdOn">Created On</th>
									<th data-sort="updatedOn">Updated On</th>
									<th class="table-cell-fit">Actions</th>
								</tr>
							</thead>
							<tbody>
								{#each $dataTableStore.filtered as row, rowIndex}
									<tr aria-rowindex={rowIndex + 1}>
										<td role="gridcell" aria-colindex={0} tabindex="0">
											<a href="routes/read/{row.id}">
												<div class="text-link" on:keydown>
													{row.routeTitle}
												</div>
											</a>
										</td>
										<td role="gridcell" aria-colindex={1} tabindex="0">
											{row.routeDescription}
										</td>
										<td role="gridcell" aria-colindex={2} tabindex="0">
											{row.routeStatus}
										</td>
										<td role="gridcell" aria-colindex={3} tabindex="0">
											{#if row.startTime}
												{new Date(row.startTime).toLocaleString('en-GB')}
											{:else}
												<p>Not Started</p>
											{/if}
										</td>
										<td role="gridcell" aria-colindex={4} tabindex="0">
											{#if row.endTime}
												{new Date(row.endTime).toLocaleString('en-GB')}
											{:else}
												<p>Not Finished</p>
											{/if}
										</td>
										<td role="gridcell" aria-colindex={3} tabindex="0">
											{new Date(row.createdOn).toLocaleString('en-GB')}
										</td>
										<td role="gridcell" aria-colindex={4} tabindex="0">
											{new Date(row.updatedOn).toLocaleString('en-GB')}
										</td>
										<td role="gridcell" aria-colindex={5} tabindex="0">
											<div class="flex gap-4">
												<button
													class="btn-icon btn-filled-secondary"
													disabled={!perms?.editUser}
													use:tooltip={{ content: 'Update User', position: 'left' }}
												>
													<span>
														<SvgIcon
															name="pencil"
															width="w-8"
															height="h-6"
															fill="fill-primary-400"
														/>
													</span>
												</button>
												<button
													class="btn-icon btn-filled-tertiary"
													disabled={!perms?.deleteUser}
													use:tooltip={{ content: 'Delete User', position: 'left' }}
												>
													<span>
														<SvgIcon
															name="trash"
															width="w-8"
															height="h-6"
															fill="fill-primary-400"
														/>
													</span>
												</button>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</div>
		</div>

		<!-- Footer -->
		<div class="card-footer">
			<hr class="!border-t-2 my-4" />
			{#if isPopulated}
				<Paginator bind:settings={$dataTableStore.pagination} />
			{/if}
		</div>
	{/if}
</div>
