<script lang="ts">
	import type { UserInterface } from '$lib/server/interfaces/userInterface';

	import { modalStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';

	export let parent: any;

	const data = $modalStore[0].meta.user as UserInterface;
</script>

<div class="card">
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="pencil" width="w-14" height="h-14" fill="fill-secondary-500" />
			<div>
				<h2>Update User</h2>
				<em>Replace the fields with the desired new values</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	<div class="card-body">
		<form use:enhance method="POST" action="/users?/recover">
			<input type="number" name="userId" value={data.id} hidden />
			<button type="submit" class="btn btn-filled-primary w-full" on:click={parent.onClose}>Recover Password</button>
		</form>
	</div>

	<form use:enhance method="POST" action="/users?/update">
		<div class="card-body">
			<div class="flex w-full gap-4 justify-between">
				<label for="firstName" class="flex-1">
					<span>First Name</span>
					<input type="text" name="firstName" id="firstName" minlength="1" required value={data.firstName} />
				</label>
				<label for="lastName" class="flex-1">
					<span>Last Name</span>
					<input type="text" name="lastName" id="lastName" minlength="1" required value={data.lastName} />
				</label>
			</div>
			<label for="email" class="my-2">
				<span>Email</span>
				<input type="email" name="email" id="email" minlength="5" readonly value={data.email} />
			</label>
			<input type="number" name="userId" value={data.id} hidden />
		</div>

		<div class="card-footer">
			<hr class="!border-t-2 my-4" />
			<div class="flex gap-4 justify-end">
				<button type="button" class="btn btn-filled-surface w-40" on:click={parent.onClose}>Cancel</button>
				<button type="submit" class="btn btn-filled-tertiary w-40" on:click={parent.onClose}>Update</button>
			</div>
		</div>
	</form>
</div>
