<script lang="ts">
	import type { LogInterface } from '$lib/server/interfaces/logInterface';
	import type { PermissionInterface } from '$lib/server/interfaces/permissionInterface';
	import type { PageData } from './$types';

	import { LogStatus } from '$lib/enums';
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { tableInteraction, tableA11y, Paginator } from '@skeletonlabs/skeleton';
	import { tooltip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	import Loader from '$lib/components/global/Loader.svelte';

	export let data: PageData;

	let perms: PermissionInterface | null = null;
	let isLoading = true;

	onMount(async () => {
		if (data.payload.logs) {
			isLoading = false;
			perms = data.payload.user as PermissionInterface;
		}
	});

	const pagination = { offset: 0, limit: 5, size: 0, amounts: [5, 7, 10] };
	const dataTableStore = createDataTableStore(data.payload.logs as LogInterface[], {
		search: '',
		sort: '',
		pagination
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));

	function clearSearchParams(): void {
		$dataTableStore.search = '';
	}

	function logStatus(log: number): string {
		let logStatus = 'Undefined';
		switch (log) {
			case LogStatus.SUCCESS:
				logStatus = 'Success';
				break;
			case LogStatus.FAILED:
			default:
				logStatus = 'Failed';
				break;
		}
		return logStatus;
	}

	function logClass(log: number): string {
		let cssClass = 'badge w-full ';
		switch (log) {
			case LogStatus.SUCCESS:
				cssClass += 'badge-filled-success';
				break;
			case LogStatus.FAILED:
			default:
				cssClass += 'badge-filled-error';
				break;
		}
		return cssClass;
	}
</script>

<div class="card card-container">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="clipboard" width="w-14" height="h-14" fill="fill-secondary-500" />
			<div>
				<h2>Logs Panel</h2>
				<em>List of logs on the system</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	{#if isLoading}
		<Loader />
	{:else}
		<!-- Body -->
		<div class="card-body">
			<div class="card-table">
				<!-- Table Search Bar -->
				<div class="card-table_bar">
					<div class="flex flex-1 gap-4">
						<button on:click={clearSearchParams} class="btn btn-filled-surface btn-base">Clear</button>
						<input bind:value={$dataTableStore.search} type="search" placeholder="Search Log..." />
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
								<th>Log Name</th>
								<th>Description</th>
								<th>Log Source</th>
								<th data-sort="logStatus">Log Status</th>
								<th data-sort="createdOn">Created On</th>
								<th data-sort="updatedOn">Updated On</th>
							</tr>
						</thead>
						<tbody>
							{#each $dataTableStore.filtered as row, rowIndex}
								<tr aria-rowindex={rowIndex + 1}>
									<td role="gridcell" aria-colindex={0} tabindex="0">
										{row.logName}
									</td>
									<td role="gridcell" aria-colindex={1} tabindex="0">
										{row.logDescription}
									</td>
									<td role="gridcell" aria-colindex={2} tabindex="0">
										{row.logSource}
									</td>
									<td role="gridcell" aria-colindex={4} tabindex="0">
										<span class={logClass(row.logStatus)}>{logStatus(row.logStatus)}</span>
									</td>
									<td role="gridcell" aria-colindex={5} tabindex="0">
										{new Date(row.createdOn).toLocaleString('en-GB')}
									</td>
									<td role="gridcell" aria-colindex={6} tabindex="0">
										{new Date(row.updatedOn).toLocaleString('en-GB')}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<div class="card-footer">
			<hr class="!border-t-2 my-4" />
			<Paginator bind:settings={$dataTableStore.pagination} />
		</div>
	{/if}
</div>
