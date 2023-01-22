<script lang="ts">
	import type { UserInterface } from '$lib/server/interfaces/userInterface';
	import { Roles } from '$lib/enums';
	import { modalStore } from '@skeletonlabs/skeleton';
	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	export let parent: any;

	interface UserReadInterface extends UserInterface {
		role: number;
	}

	const data = $modalStore[0].meta.user as UserReadInterface;

	function roleName(role: number): string {
		let roleName = 'Undefined';
		switch(role) {
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
</script>

<div class="card">
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="user" width="w-14" height="h-14" fill="fill-primary-400" />
			<div>
				<h2>{ data.firstName } { data.lastName }</h2>
				<a href="mailto: { data.email }"><em>{ data.email }</em></a>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	<div class="card-body">
		<div class="flex justify-between">
			<div class="flex flex-col justify-between items-center !bg-primary-500 p-4 w-32 h-32 rounded-full">
				<SvgIcon name="shield-halved" width="w-24" height="h-24" fill="fill-primary-400" />
				<b>{ roleName(data.role) }</b>
			</div>
			<div class="flex flex-col justify-between w-full pl-4">
				<div class="w-full">
					
					<label for="createdOn">Created On</label>
					<input type="text" disabled placeholder={new Date(data.createdOn).toLocaleString('en-GB')}>
				</div>
				<div>
					<label for="createdOn">Updated On</label>
					<input type="text" disabled placeholder={new Date(data.updatedOn).toLocaleString('en-GB')}>
				</div>
			</div>
		</div>
	</div>

	<div class="card-footer">
		<hr class="!border-t-2 my-4" />
		<div class="flex justify-end">
            <button type="submit" class="btn btn-filled-secondary w-40" on:click={parent.onClose}>Close</button>
        </div>
	</div>
</div>
