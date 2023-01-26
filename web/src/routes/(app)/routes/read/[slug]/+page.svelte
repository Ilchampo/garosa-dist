<script lang="ts">
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import type { RoutePointInterface } from '$lib/server/interfaces/routePointInterface';
	import type { PermissionInterface } from '$lib/server/interfaces/permissionInterface';
	import type { PageData } from './$types';

	import { Modals, RoutePointStatus, RouteStatus } from '$lib/enums';
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { tableInteraction, tableA11y, Paginator } from '@skeletonlabs/skeleton';
	import { modalStore, tooltip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import ModalRouteRead from '$lib/components/route/ModalRouteRead.svelte';
	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	import Loader from '$lib/components/global/Loader.svelte';

	export let data: PageData;

	let perms: PermissionInterface | null = null;
	let isLoading = true;
	let isPopulated = false;

	onMount(async () => {
		perms = data.payload.user as PermissionInterface;
		isPopulated = data.payload.routePoints.length > 0;
		isLoading = false;
	});

	const pagination = { offset: 0, limit: 5, size: 0, amounts: [5, 7, 10] };
	const dataTableStore = createDataTableStore(data.payload.routePoints as RoutePointInterface[], {
		search: '',
		sort: '',
		pagination
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));

	function clearSearchParams(): void {
		$dataTableStore.search = '';
	}

	function openModal(option: Modals, routePoint?: RoutePointInterface): void {
		let component: ModalComponent;
		let settings: ModalSettings;

		switch (option) {
			case Modals.READ:
				component = { ref: ModalRouteRead };
				settings = { type: 'component', component, meta: { routePoint } };
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

	function pointStatusName(status: RoutePointStatus): string {
		switch (status) {
			case RoutePointStatus.ASSIGNED:
				return 'Assigned';
			case RoutePointStatus.IN_PROGRESS:
				return 'In Progress';
			case RoutePointStatus.FINISHED:
				return 'Finished';
			case RoutePointStatus.CANCELED:
			default:
				return 'Canceled';
		}
	}

	function pointStatusClass(status: RoutePointStatus): string {
		switch (status) {
			case RoutePointStatus.ASSIGNED:
				return 'bg-tertiary-600';
			case RoutePointStatus.IN_PROGRESS:
				return 'bg-tertiary-500';
			case RoutePointStatus.FINISHED:
				return 'bg-tertiary-400';
			case RoutePointStatus.CANCELED:
			default:
				return 'bg-tertiary-300';
		}
	}
</script>

<div class="card card-container">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="truck" width="w-14" height="h-14" fill="fill-secondary-500" />
			<div>
				<h2>Route Panel</h2>
				<em>Information about selected route</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	<!-- Body -->
	<div class="card-body">
		{#if isLoading}
			<Loader />
		{:else}
			<!-- Body Header -->
			<div class="flex w-full justify-between gap-4 pb-4">
				<!-- Routes Status -->
				<div class="card flex flex-1 h-20 items-center !bg-primary-600/50 p-4 gap-4">
					<SvgIcon name="user" width="w-14" height="h-14" fill="fill-primary-100" />
					<div class="flex flex-col gap-2">
						<h3>Assigned Distributor</h3>
						<p>{data.payload.distributor.firstName} {data.payload.distributor.lastName}</p>
					</div>
				</div>
				<!-- Routes Status -->
				<div class="card flex flex-1 h-20 items-center !bg-primary-500/50 p-4 gap-4">
					<SvgIcon name="check" width="w-14" height="h-14" fill="fill-primary-100" />
					<div class="flex flex-col gap-2">
						<h3>Route Status</h3>
						<p>{routeStatusName(data.payload.route.routeStatus)}</p>
					</div>
				</div>
				<!-- Route Start Time -->
				<div class="card flex flex-1 h-20 items-center !bg-primary-400/50 p-4 gap-4">
					<SvgIcon name="hourglass-start" width="w-14" height="h-14" fill="fill-primary-100" />
					<div class="flex flex-col gap-2">
						<h3>Start Time</h3>
						<p>
							{data.payload.route.startTime
								? new Date(data.payload.route.startTime).toLocaleString('en-GB')
								: 'Not Started'}
						</p>
					</div>
				</div>
				<!-- Route End Time -->
				<div class="card flex flex-1 h-20 items-center !bg-primary-400/50 p-4 gap-4">
					<SvgIcon name="hourglass-end" width="w-14" height="h-14" fill="fill-primary-100" />
					<div class="flex flex-col gap-2">
						<h3>End Time</h3>
						<p>
							{data.payload.route.startTime
								? new Date(data.payload.route.endTime).toLocaleString('en-GB')
								: 'Not Finished'}
						</p>
					</div>
				</div>
			</div>
			<!-- Body Table -->
			<div class="card-table">
				<!-- Table Search Bar -->
				<div class="card-table_bar">
					<div class="flex flex-1 gap-4">
						<button on:click={clearSearchParams} class="btn btn-filled-surface btn-base">Clear</button>
						<input bind:value={$dataTableStore.search} type="search" placeholder="Search Report Title..." />
					</div>
					<button
						class="btn-icon btn-filled-secondary"
						use:tooltip={{ content: 'Reload', position: 'left' }}
						on:click={() => {
							location.reload();
						}}
					>
						<span> <SvgIcon name="reload" width="w-8" height="h-6" fill="fill-secondary-100" /> </span>
					</button>
				</div>
			</div>

			<!-- Body Content -->
			{#if !isPopulated}
				<div class="card-table_empty">
					<SvgIcon name="magnifying-glass" width="w-60" height="h-60" fill="fill-primary-400" />
					<h1>{data.payload.message}</h1>
					<p>Currently there are not distribution routes points available!</p>
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
								<th>Report Title</th>
								<th data-sort="routePointStatus">Report Status</th>
								<th data-sort="startTime">Start Time</th>
								<th data-sort="endTime">End Time</th>
								<th data-sort="createdOn">Created On</th>
								<th data-sort="updatedOn">Updated On</th>
							</tr>
						</thead>
						<tbody>
							{#each $dataTableStore.filtered as row, rowIndex}
								<tr aria-rowindex={rowIndex + 1}>
									<td role="gridcell" aria-colindex={0} tabindex="0">
										{#if row.routePointStatus === RoutePointStatus.FINISHED}
											<div
												class="text-link"
												on:click={() => {
													openModal(Modals.READ, row);
												}}
												on:keydown
											>
												{row.reportTitle}
											</div>
										{:else}
											{row.reportTitle ?? 'Pending'}
										{/if}
									</td>
									<td role="gridcell" aria-colindex={1} tabindex="0">
										<span class="badge w-full {pointStatusClass(row.routePointStatus)}"
											>{pointStatusName(row.routePointStatus)}</span
										>
									</td>
									<td role="gridcell" aria-colindex={2} tabindex="0">
										{row.startTime
											? new Date(row.startTime).toLocaleString('en-GB')
											: 'Not Started'}
									</td>
									<td role="gridcell" aria-colindex={3} tabindex="0">
										{row.endTime ? new Date(row.endTime).toLocaleString('en-GB') : 'Not Finished'}
									</td>
									<td role="gridcell" aria-colindex={4} tabindex="0">
										{new Date(row.createdOn).toLocaleString('en-GB')}
									</td>
									<td role="gridcell" aria-colindex={5} tabindex="0">
										{new Date(row.updatedOn).toLocaleString('en-GB')}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		{/if}
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
