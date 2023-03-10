<script lang="ts">
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import type { UserInterface } from '$lib/server/interfaces/userInterface';
	import type { PermissionInterface } from '$lib/server/interfaces/permissionInterface';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';

	import { Modals, Roles } from '$lib/enums';
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { tableInteraction, tableA11y, Paginator } from '@skeletonlabs/skeleton';
	import { modalStore, tooltip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	import Loader from '$lib/components/global/Loader.svelte';
	import ModalCreate from '$lib/components/user/ModalCreate.svelte';
	import ModalRead from '$lib/components/user/ModalRead.svelte';
	import ModalUpdate from '$lib/components/user/ModalUpdate.svelte';
	import ModalDelete from '$lib/components/user/ModalDelete.svelte';

	export let data: PageData;
	export let form: ActionData;

	interface UserGridInterface extends UserInterface {
		role: number;
	}
	let perms: PermissionInterface | null = null;
	let isLoading = true;

	onMount(async () => {
		if (data.payload.users) {
			isLoading = false;
			perms = data.payload.user as PermissionInterface;
		}
	});

	const pagination = { offset: 0, limit: 5, size: 0, amounts: [5, 7, 10] };
	const dataTableStore = createDataTableStore(data.payload.users as UserGridInterface[], {
		search: '',
		sort: '',
		pagination
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));

	function clearSearchParams(): void {
		$dataTableStore.search = '';
	}

	function openModal(option: Modals, user?: UserInterface): void {
		let component: ModalComponent;
		let settings: ModalSettings;

		switch (option) {
			case Modals.CREATE:
				component = { ref: ModalCreate };
				settings = { type: 'component', component };
				modalStore.trigger(settings);
				break;
			case Modals.READ:
				component = { ref: ModalRead };
				settings = { type: 'component', component, meta: { user } };
				modalStore.trigger(settings);
				break;
			case Modals.UPDATE:
				component = { ref: ModalUpdate };
				settings = { type: 'component', component, meta: { user } };
				modalStore.trigger(settings);
				break;
			case Modals.DELETE:
				component = { ref: ModalDelete };
				settings = { type: 'component', component, meta: { user } };
				modalStore.trigger(settings);
				break;
		}
	}

	function roleClass(role: number): string {
		let cssClass = 'badge w-full ';
		switch (role) {
			case Roles.MASTER:
				cssClass += 'bg-tertiary-600';
				break;
			case Roles.ADMINISTRATOR:
				cssClass += 'bg-tertiary-500';
				break;
			case Roles.SUPERVISOR:
				cssClass += 'bg-tertiary-400';
				break;
			case Roles.DISTRIBUTOR:
			default:
				cssClass += 'bg-tertiary-300';
				break;
		}
		return cssClass;
	}

	function roleName(role: number): string {
		let roleName = 'Undefined';
		switch (role) {
			case Roles.MASTER:
				roleName = 'Master';
				break;
			case Roles.ADMINISTRATOR:
				roleName = 'Administrator';
				break;
			case Roles.SUPERVISOR:
				roleName = 'Supervisor';
				break;
			case Roles.DISTRIBUTOR:
				roleName = 'Distributor';
				break;
		}
		return roleName;
	}

	function actionEnable(role: Roles): boolean {
		return role === Roles.MASTER || role === Roles.ADMINISTRATOR;
	}
</script>

<div class="card card-container">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="user-group" width="w-14" height="h-14" fill="fill-secondary-500" />
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
			{#if form}
				<div class="flex bg-surface-500/20 border border-surface-500 p-4 mb-4 justify-between items-center">
					<div class="flex items-center">
						<SvgIcon name="user" width="w-14" height="h-14" fill="fill-surface-500" />
						<div class="flex flex-col ml-4">
							<h3>{form.request.msg}</h3>
							<p>
								User: <b>{form.request.payload.email}</b>
								{#if form.request.payload.password}
									/ Password: <b>{form.request.payload.password}</b>
								{/if}
							</p>
						</div>
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
						<input bind:value={$dataTableStore.search} type="search" placeholder="Search User Name..." />
					</div>
					<button
						class="btn-icon btn-filled-secondary"
						disabled={!perms?.createUser}
						use:tooltip={{ content: 'Create User', position: 'left' }}
						on:click={() => {
							openModal(Modals.CREATE);
						}}
					>
						<span> <SvgIcon name="plus" width="w-8" height="h-6" fill="fill-secondary-100" /> </span>
					</button>
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
								<th>Full Name</th>
								<th data-sort="role">User Role</th>
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
										<div
											class="text-link"
											on:click={() => {
												openModal(Modals.READ, row);
											}}
											on:keydown
										>
											{row.firstName}
											{row.lastName}
										</div>
									</td>
									<td role="gridcell" aria-colindex={1} tabindex="0">
										<span class={roleClass(row.role)}>{roleName(row.role)}</span>
									</td>
									<td role="gridcell" aria-colindex={2} tabindex="0">
										{row.email}
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
												disabled={actionEnable(row.role) || !perms?.editUser}
												use:tooltip={{ content: 'Update User', position: 'left' }}
												on:click={() => {
													openModal(Modals.UPDATE, row);
												}}
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
												disabled={actionEnable(row.role) || !perms?.deleteUser}
												use:tooltip={{ content: 'Delete User', position: 'left' }}
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
			</div>
		</div>

		<!-- Footer -->
		<div class="card-footer">
			<hr class="!border-t-2 my-4" />
			<Paginator bind:settings={$dataTableStore.pagination} />
		</div>
	{/if}
</div>
