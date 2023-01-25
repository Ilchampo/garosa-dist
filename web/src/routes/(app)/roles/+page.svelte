<script lang="ts">
	import type { PermissionInterface } from '$lib/server/interfaces/permissionInterface';
	import type { PageData } from './$types';

	import { Roles } from '$lib/enums';
	import { onMount } from 'svelte';

	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	import Loader from '$lib/components/global/Loader.svelte';

	export let data: PageData;

	let perms: PermissionInterface | null = null;
	let isLoading = true;

	onMount(async () => {
		if (data.payload.roles) {
			isLoading = false;
			perms = data.payload.user as PermissionInterface;
		}
	});

	function roleClass(role: number): string {
		let cssClass = 'badge w-full ';
		switch (role) {
			case Roles.MASTER:
				cssClass += 'bg-tertiary-300';
				break;
			case Roles.ADMINISTRATOR:
				cssClass += 'bg-tertiary-600';
				break;
			case Roles.SUPERVISOR:
				cssClass += 'bg-tertiary-500';
				break;
			case Roles.DISTRIBUTOR:
			default:
				cssClass += 'bg-tertiary-400';
				break;
		}
		return cssClass;
	}
</script>

<div class="card card-container">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="shield-halved" width="w-14" height="h-14" fill="fill-secondary-500" />
			<div>
				<h2>Roles Panel</h2>
				<em>List of roles on the system</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	{#if isLoading}
		<Loader />
	{:else}
		<!-- Body -->
		<div class="card-body">
			<div class="grid grid-cols-2 gap-4">
				{#each data.payload.roles as role}
					<div class="flex w-full {roleClass(role.id)} p-4 rounded justify-start">
						<SvgIcon name="shield-halved" width="w-28" height="h-28" fill="fill-tertiary-100" />
						<div class="flex flex-col justify-between">
							<h3>{role.roleName}</h3>
							<em>Created on {new Date(role.createdOn).toLocaleString('en-GB')}</em>
							<em>Updated on {new Date(role.updatedOn).toLocaleString('en-GB')}</em>
							<p>{role.roleDescription}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Footer -->
		<div class="card-footer">
			<hr class="!border-t-2 my-4" />
		</div>
	{/if}
</div>
