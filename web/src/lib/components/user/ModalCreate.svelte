<script lang="ts">
    import { enhance } from '$app/forms';
    import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
    import { UserModal } from '$lib/enums';
    export let parent: any;
</script>

<div class="card">
    <div class="card-header">
        <div class="flex flex-row items-center gap-4">
			<SvgIcon name="plus" width="w-14" height="h-14" fill="fill-primary-400" />
			<div>
				<h2>Create User</h2>
				<em>Enter the following fields</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
    </div>

    <div class="card-body">
        <form use:enhance method="POST" action='/users?/create'>
            <div class="flex w-full gap-4 justify-between">
                <label for="firstName" class="flex-1">
                    <span>First Name</span>
                    <input type="text" name="firstName" id="firstName" minlength="5" required />
                </label>
                <label for="lastName" class="flex-1">
                    <span>Last Name</span>
                    <input type="text" name="lastName" id="lastName" minlength="5" required />
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
                    <option value="2">Distributor</option>
                </select>
            </label>
            <button type="submit" class="btn btn-filled-primary btn-base w-full my-4" on:click={parent.openResultModal(UserModal.CREATE)}>Create User</button>
        </form>
    </div>

    <div class="card-footer">

    </div>
</div>