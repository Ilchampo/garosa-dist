<script lang="ts">
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import type { PointInterface } from '$lib/interfaces/pointInterface';
	import { onMount } from 'svelte';
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { tableInteraction, tableA11y, Paginator } from '@skeletonlabs/skeleton';
	import { modalStore } from '@skeletonlabs/skeleton';
	import Loader from '../../../components/common/Loader.svelte';
	import SvgIcon from '../../../components/SvgIcon/SvgIcon.svelte';
	import ModalRead from '../../../components/points/ModalRead.svelte';
	import ModalUpdated from '../../../components/points/ModalUpdate.svelte';

	export let data: PageData;
	let isLoading = true;
	onMount(async () => {
		isLoading = data ? false : true;
	});
	const points: any[] = data.payload;
	const dataTableStore = createDataTableStore(points, {
		search: '',
		sort: '',
		pagination: { offset: 0, limit: 7, size: 0, amounts: [5, 7, 10] }
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));
	function clearParams() {
		$dataTableStore.search = '';
	}

	// Functions to render modals
	function modalRead(point: PointInterface): void {
		const component: ModalComponent = { ref: ModalRead };
		const settings: ModalSettings = { type: 'component', component, meta: { point } };
		modalStore.trigger(settings);
	}
	function modalUpdate(point: PointInterface): void {
		const component: ModalComponent = { ref: ModalUpdated };
		const settings: ModalSettings = { type: 'component', component, meta: { point } };
		modalStore.trigger(settings);
	}
</script>

<div class="content-container">
	<div class="card h-full md:max-h-full">
		<div class="card-header">
			<div class="flex items-center">
				<SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-primary-500" />
				<div class="ml-4">
					<h2>Distribution Points</h2>
					<hr class="!border-t-1" />
					<em>Manage distribution points in Garosa Dist</em>
				</div>
			</div>
		</div>
		<div class="card-body">
			{#if isLoading}
				<Loader />
			{:else if !data.payload}
				<div class="not-found">
					<SvgIcon name="magnifying-glass" width="w-20" height="h-20" fill="fill-surface-500" />
					<h3>{data.msg}</h3>
				</div>
			{:else}
				<div class="flex mb-4">
					<button on:click={clearParams} class="btn btn-filled-surface btn-base">Clear</button>
					<input
						bind:value={$dataTableStore.search}
						type="search"
						placeholder="Search Distribution Point..."
					/>
					<button class="btn btn-filled-primary btn-base ml-4">Create</button>
				</div>
				<table class="table" role="grid" use:tableInteraction use:tableA11y>
					<thead
						on:click={(e) => {
							dataTableStore.sort(e);
						}}
						on:keypress
					>
						<tr>
							<th>Distribution Point</th>
							<th>Description</th>
							<th data-sort="createdOn">Created On</th>
							<th data-sort="updatedOn">Updated On</th>
							<th class="table-cell-fit">Manage</th>
						</tr>
					</thead>
					<tbody>
						{#each $dataTableStore.filtered as row, rowIndex}
							<tr aria-rowindex={rowIndex + 1}>
								<td
									role="gridcell"
									aria-colindex={0}
									tabindex="0"
									class="md:!whitespace-normal capitalize"
								>
									<div class="flex items-center">
										<img class="table-image" src={row.pointImage} alt={row.pointName} />
										<div
											class="text_clickable"
											on:keydown
											on:click={() => {
												modalRead(row);
											}}
										>
											{row.pointName}
										</div>
									</div>
								</td>
								<td
									role="gridcell"
									aria-colindex={1}
									tabindex="0"
									class="md:!whitespace-normal capitalize"
								>
									{row.pointDescription}
								</td>
								<td role="gridcell" aria-colindex={2} tabindex="0">
									{new Date(row.createdOn).toLocaleString('en-GB')}
								</td>
								<td role="gridcell" aria-colindex={3} tabindex="0">
									{new Date(row.updatedOn).toLocaleString('en-GB')}
								</td>
								<td role="gridcell" aria-colindex={4} tabindex="0">
									<div class="flex">
										<button
											on:click={() => {
												modalUpdate(row);
											}}
											class="btn btn-filled-primary btn-base">Edit</button
										>
										<button class="btn btn-filled-secondary btn-base">Delete</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
		<div class="card-footer">
			<div class="p-4">
				<Paginator bind:settings={$dataTableStore.pagination} />
			</div>
		</div>
	</div>
</div>
