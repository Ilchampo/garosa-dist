<script lang="ts">
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import type { UserInterface } from '$lib/server/interfaces/userInterface';
	import { UserModal } from '$lib/enums';
	import type { PageData } from './$types';

	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { tableInteraction, tableA11y, Paginator } from '@skeletonlabs/skeleton';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import ModalCreate from '$lib/components/user/ModalCreate.svelte';
	import ModalRead from '$lib/components/user/ModalRead.svelte';
	import ModalUpdate from '$lib/components/user/ModalUpdate.svelte';
	import ModalDelete from '$lib/components/user/ModalDelete.svelte';
	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	import Loader from '$lib/components/global/Loader.svelte';

	export let data: PageData;

	let isLoading = true;
	let users: UserInterface[] = [];

	onMount(async () => {
		if (data.payload) {
			isLoading = false;
			users = data.payload as UserInterface[];
		}
	});

	const pagination = { offset: 0, limit: 7, size: 0, amounts: [5, 7, 10] };
	const dataTableStore = createDataTableStore(users, { search: '', sort: '', pagination });
	dataTableStore.subscribe((model) => dataTableHandler(model));

	function clearSearchParams(): void {
		$dataTableStore.search = '';
		$dataTableStore.sort = '';
	}

	function openModal(option: UserModal, user?: UserInterface): void {
		let component: ModalComponent;
		let settings: ModalSettings;

		switch (option) {
			case UserModal.CREATE:
				component = { ref: ModalCreate };
				settings = { type: 'component', component };
				modalStore.trigger(settings);
				break;
			case UserModal.READ:
				component = { ref: ModalRead };
				settings = { type: 'component', component, meta: { user } };
				modalStore.trigger(settings);
				break;
			case UserModal.UPDATE:
				component = { ref: ModalUpdate };
				settings = { type: 'component', component, meta: { user } };
				modalStore.trigger(settings);
				break;
			case UserModal.DELETE:
				component = { ref: ModalDelete };
				settings = { type: 'component', component, meta: { user } };
				modalStore.trigger(settings);
				break;
		}
	}
</script>

<div class="card card-container">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="user-group" width="w-14" height="h-14" fill="fill-primary-400" />
			<div>
				<h2>Users Panel</h2>
				<em>List of users on the system</em>
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
					<div class="flex flex-1">
						<button on:click={clearSearchParams} class="btn btn-filled-surface btn-base">Clear</button>
						<input bind:value={$dataTableStore.search} type="search" placeholder="Search Distribution Point..." />
					</div>
					<button class="btn-icon btn-filled-primary" on:click={() => { openModal(UserModal.CREATE); }} >
						<span> <SvgIcon name="plus" width="w-8" height="h-6" fill="fill-primary-400" /> </span>
					</button>
				</div>

				<!-- Table Content -->
				<div class="card-table_content"> 
					<table class="table" role="grid" use:tableInteraction use:tableA11y>
						<thead on:click={(e) => { dataTableStore.sort(e) }} on:keypress>
							<tr>
								<th>Full Name</th>
								<th>User Role</th>
								<th>User Email</th>
								<th data-sort="createdOn">Created On</th>
								<th data-sort="updatedOn">Updated On</th>
								<th class="table-cell-fit">Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each $dataTableStore.filtered as row, rowIndex}
								<tr aria-rowindex={rowIndex + 1}>
									<td role="gridcell" aria-colindex={0} tabindex="0">
										{row.firstName} {row.lastName}
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

<style>
	.card-table {
		
	}

	.card-table_bar {
		@apply flex w-full gap-4 justify-between;
	}

	.card-table_content {
	}
</style>
