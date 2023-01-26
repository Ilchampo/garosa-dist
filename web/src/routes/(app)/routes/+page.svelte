<script lang="ts">
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import type { RouteInterface } from '$lib/server/interfaces/routeInterface';
	import type { PermissionInterface } from '$lib/server/interfaces/permissionInterface';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';

	import { Modals, RouteStatus } from '$lib/enums';
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { tableInteraction, tableA11y, Paginator } from '@skeletonlabs/skeleton';
	import { modalStore, tooltip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import ModalRouteDelete from '$lib/components/route/ModalRouteDelete.svelte';
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

	function openModal(option: Modals, route?: RouteInterface): void {
		let component: ModalComponent;
		let settings: ModalSettings;
		switch (option) {
			case Modals.DELETE:
				component = { ref: ModalRouteDelete };
				settings = { type: 'component', component, meta: { route } };
				modalStore.trigger(settings);
				break;
		}
	}

	function routeStatusName(status: RouteStatus): string {
		switch (status) {
			case RouteStatus.ACTIVE:
				return 'Active';
			case RouteStatus.IN_PROGRESS:
				return 'In Progress';
			case RouteStatus.COMPLETED:
				return 'Completed';
			case RouteStatus.DELETED:
				return 'Deleted';
			case RouteStatus.CANCELED:
			default:
				return 'Canceled';
		}
	}

	function routeStatusClass(status: RouteStatus): string {
		switch (status) {
			case RouteStatus.ACTIVE:
				return 'bg-primary-600';
			case RouteStatus.IN_PROGRESS:
				return 'bg-primary-500';
			case RouteStatus.COMPLETED:
				return 'bg-primary-400';
			case RouteStatus.DELETED:
				return 'bg-primary-300';
			case RouteStatus.CANCELED:
			default:
				return 'bg-primary-200';
		}
	}
</script>

<div class="card card-container">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="truck" width="w-14" height="h-14" fill="fill-secondary-500" />
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
				<div class="flex bg-surface-500/20 border border-surface-500 p-4 mb-4 justify-between items-center">
					<div class="flex items-center">
						<SvgIcon name="truck" width="w-14" height="h-14" fill="fill-surface-500" />
						<div class="flex flex-col ml-4"><h3>{form.request.msg}</h3></div>
					</div>
					<button
						class="btn-icon btn-filled-tertiary"
						use:tooltip={{ content: 'Dismiss', position: 'left' }}
						on:click={() => {
							location.reload();
						}}
					>
						<span> <SvgIcon name="check" width="w-8" height="h-6" fill="fill-tertiary-100" /> </span>
					</button>
				</div>
			{/if}

			<div class="card-table">
				<!-- Table Search Bar -->
				<div class="card-table_bar">
					<div class="flex flex-1 gap-4">
						<button on:click={clearSearchParams} class="btn btn-filled-surface btn-base">Clear</button>
						<input
							bind:value={$dataTableStore.search}
							type="search"
							placeholder="Search Distribution Route Name..."
						/>
					</div>
					<a href="/routes/create" use:tooltip={{ content: 'Create Distribution Route', position: 'left' }}>
						<button class="btn-icon btn-filled-secondary" disabled={!perms?.createRoute}>
							<span> <SvgIcon name="plus" width="w-8" height="h-6" fill="fill-secondary-100" /> </span>
						</button>
					</a>
					<button
						class="btn-icon btn-filled-tertiary"
						use:tooltip={{ content: 'Reload', position: 'left' }}
						on:click={() => {
							location.reload();
						}}
					>
						<span> <SvgIcon name="reload" width="w-8" height="h-6" fill="fill-tertiary-100" /> </span>
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
									<th>Route Name</th>
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
											<a href="routes/read/{row.id}" style="color: inherit">
												<div class="text-link" on:keydown>
													{row.routeTitle}
												</div>
											</a>
										</td>
										<td role="gridcell" aria-colindex={1} tabindex="0">
											{row.routeDescription}
										</td>
										<td role="gridcell" aria-colindex={2} tabindex="0">
											<span class="badge w-full {routeStatusClass(row.routeStatus)}"
												>{routeStatusName(row.routeStatus)}</span
											>
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
													disabled={!perms?.completeRoute}
													use:tooltip={{ content: 'Complete Route', position: 'left' }}
												>
													<span>
														<SvgIcon
															name="pencil"
															width="w-8"
															height="h-6"
															fill="fill-secondary-100"
														/>
													</span>
												</button>
												<button
													class="btn-icon btn-filled-tertiary"
													disabled={!perms?.deleteRoute || row.routeStatus === RouteStatus.IN_PROGRESS}
													use:tooltip={{ content: 'Delete Route', position: 'left' }}
													on:click={() => {
														openModal(Modals.DELETE, row);
													}}
												>
													<span>
														<SvgIcon
															name="trash"
															width="w-8"
															height="h-6"
															fill="fill-tertiary-100"
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
