<script lang="ts">
	import { enhance } from '$app/forms';
	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	export let parent: any;
</script>

<div class="card">
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="plus" width="w-14" height="h-14" fill="fill-secondary-500" />
			<div>
				<h2>Create User</h2>
				<em>Enter the following fields</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	<form use:enhance method="POST" action="/users?/create">
		<div class="card-body">
			<div class="flex w-full gap-4 justify-between">
				<label for="firstName" class="flex-1">
					<span>First Name</span>
					<input type="text" name="firstName" id="firstName" minlength="1" required />
				</label>
				<label for="lastName" class="flex-1">
					<span>Last Name</span>
					<input type="text" name="lastName" id="lastName" minlength="1" required />
				</label>
			</div>
			<label for="email" class="my-2">
				<span>Email</span>
				<input type="email" name="email" id="email" minlength="5" required />
			</label>
			<label for="roleId" class="my-2">
				<span>Role</span>
				<select name="roleId" id="roleId" required>
					<option value="2">Supervisor</option>
					<option value="3">Distributor</option>
				</select>
			</label>
		</div>
		<div class="card-footer">
			<hr class="!border-t-2 my-4" />
			<div class="flex gap-4 justify-end">
				<button type="button" class="btn btn-filled-surface w-40" on:click={parent.onClose}>Cancel</button>
				<button type="submit" class="btn btn-filled-tertiary w-40" on:click={parent.onClose}>Create User</button
				>
			</div>
		</div>
	</form>
</div>
