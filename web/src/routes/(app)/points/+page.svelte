<script lang="ts">
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import type { PointInterface } from '$lib/server/interfaces/pointInterface';
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
	import ModalPointRead from '$lib/components/point/ModalPointRead.svelte';
	import ModalPointDelete from '$lib/components/point/ModalPointDelete.svelte';

	export let data: PageData;
	export let form: ActionData;

	let perms: PermissionInterface | null = null;
	let isLoading = true;

	onMount(async () => {
		if (data.payload.points) {
			isLoading = false;
			perms = data.payload.user as PermissionInterface;
		}
	});

	const pagination = { offset: 0, limit: 5, size: 0, amounts: [5, 7, 10] };
	const dataTableStore = createDataTableStore(data.payload.points as PointInterface[], {
		search: '',
		sort: '',
		pagination
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));

	function clearSearchParams(): void {
		$dataTableStore.search = '';
	}

	function openModal(option: Modals, point?: PointInterface): void {
		let component: ModalComponent;
		let settings: ModalSettings;

		switch (option) {
			case Modals.READ:
				component = { ref: ModalPointRead };
				settings = { type: 'component', component, meta: { point } };
				modalStore.trigger(settings);
				break;
			case Modals.DELETE:
				component = { ref: ModalPointDelete };
				settings = { type: 'component', component, meta: { point } };
				modalStore.trigger(settings);
				break;
		}
	}
</script>

<div class="card card-container">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-primary-400" />
			<div>
				<h2>Distribution Points Panel</h2>
				<em>List of distribution points on the system</em>
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
						<SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-primary-400" />
						<div class="flex flex-col ml-4">
							<h3>{form.request.msg}</h3>
						</div>
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
							placeholder="Search Distribution Points..."
						/>
					</div>
					<button
						class="btn-icon btn-filled-primary"
						disabled={!perms?.createPoint}
						use:tooltip={{ content: 'Create Point', position: 'left' }}
					>
						<span> <SvgIcon name="plus" width="w-8" height="h-6" fill="fill-primary-400" /> </span>
					</button>
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
								<th>Point Name</th>
								<th>Description</th>
								<th data-sort="createdOn">Created On</th>
								<th data-sort="updatedOn">Updated On</th>
								<th class="table-cell-fit">Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each $dataTableStore.filtered as row, rowIndex}
								<tr aria-rowindex={rowIndex + 1}>
									<td role="gridcell" aria-colindex={0} tabindex="0">
										<div class="flex gap-4 items-center">
											<img src={row.pointImage} alt={row.pointName} class="card-table_image" />
											<div
												class="text-link"
												on:click={() => {
													openModal(Modals.READ, row);
												}}
												on:keydown
											>
												{row.pointName}
											</div>
										</div>
									</td>
									<td role="gridcell" aria-colindex={1} tabindex="0">
										{row.pointDescription}
									</td>
									<td role="gridcell" aria-colindex={2} tabindex="0">
										{new Date(row.createdOn).toLocaleString('en-GB')}
									</td>
									<td role="gridcell" aria-colindex={3} tabindex="0">
										{new Date(row.updatedOn).toLocaleString('en-GB')}
									</td>
									<td role="gridcell" aria-colindex={5} tabindex="0">
										<div class="flex gap-4">
											<a href="/points/update/{row.id}">
												<button
													class="btn-icon btn-filled-secondary"
													disabled={!perms?.updatePointById}
													use:tooltip={{ content: 'Update Point', position: 'left' }}
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
											</a>
											<button
												class="btn-icon btn-filled-tertiary"
												disabled={!perms?.deletePointById}
												use:tooltip={{ content: 'Delete Point', position: 'left' }}
												on:click={() => {
													openModal(Modals.DELETE, row);
												}}
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
			</div>
		</div>

		<!-- Footer -->
		<div class="card-footer">
			<hr class="!border-t-2 my-4" />
			<Paginator bind:settings={$dataTableStore.pagination} />
		</div>
	{/if}
</div>
