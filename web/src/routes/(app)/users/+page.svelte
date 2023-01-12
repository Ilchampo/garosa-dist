<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import {
		createDataTableStore,
		dataTableHandler,
		tableInteraction,
		tableA11y,
		Paginator
	} from '@skeletonlabs/skeleton';
	const dataSource: any[] = data.payload;
	const dataTableStore = createDataTableStore(dataSource, {
		search: '',
		sort: '',
		pagination: { offset: 0, limit: 7, size: 0, amounts: [5, 7, 10] }
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));
</script>

<div class="card w-full max-h-full">
	<div class="card-header">
		<h2>Users</h2>
		<p>Information about the current users on Garosa Dist</p>
	</div>

	<div class="card-content">
		<section class="card !bg-secondary-500/5">
			<div class="card-header">
				<div class="flex gap-4">
					<input bind:value={$dataTableStore.search} type="search" placeholder="Search Table..." />
					<button class="btn btn-filled-tertiary btn-base">Create</button>
				</div>
			</div>
			<div class="p-4">
				<div class="table-container">
					<table class="table table-hover" role="grid" use:tableInteraction use:tableA11y>
						<thead
							on:click={(e) => {
								dataTableStore.sort(e);
							}}
							on:keypress
						>
							<tr>
								<th
									><input
										type="checkbox"
										on:click={(e) => {
											dataTableStore.selectAll(e.currentTarget.checked);
										}}
									/></th
								>
								<th data-sort="role">Role</th>
								<th>Full Name</th>
								<th>Email</th>
								<th data-sort="createdOn">Created On</th>
								<th data-sort="updatedOn">Updated On</th>
								<th class="table-cell-fit">Manage</th>
							</tr>
						</thead>
						<tbody>
							{#each $dataTableStore.filtered as row, rowIndex}
								<tr class:table-row-checked={row.dataTableChecked} aria-rowindex={rowIndex + 1}>
									<td role="gridcell" aria-colindex={0} tabindex="0">
										<input type="checkbox" bind:checked={row.dataTableChecked} />
									</td>
									<td role="gridcell" aria-colindex={1} tabindex="0">
										{#if row.role === 1}
											<span class="badge w-full badge-filled-primary">Administrator</span>
										{:else if row.role === 2}
											<span class="badge w-full badge-filled-secondary">Supervisor</span>
										{:else if row.role === 3}
											<span class="badge w-full badge-filled-tertiary">Distributor</span>
										{:else}
											<span class="badge w-full badge-filled-surface">Master</span>
										{/if}
									</td>
									<td role="gridcell" aria-colindex={2} tabindex="0" class="md:!whitespace-normal capitalize">
										{row.firstName}
										{row.lastName}
									</td>
									<td role="gridcell" aria-colindex={3} tabindex="0" class="md:!whitespace-normal">
										{row.email}
									</td>
									<td role="gridcell" aria-colindex={4} tabindex="0" class="md:!whitespace-normal">
										{new Date(row.createdOn).toLocaleString('en-GB')}
									</td>
									<td role="gridcell" aria-colindex={5} tabindex="0" class="md:!whitespace-normal">
										{new Date(row.updatedOn).toLocaleString('en-GB')}
									</td>
									<td role="gridcell" aria-colindex={6} tabindex="0" class="table-cell-fit">
										{#if row.role === 1 || row.role === 4}
											<b>No actions available</b>
										{:else}
											<button class="btn btn-filled-secondary btn-base">Update</button>
											<button class="btn btn-filled-error btn-base">Delete</button>
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
			<div class="card-footer">
				<Paginator bind:settings={$dataTableStore.pagination} />
			</div>
		</section>
	</div>
</div>
