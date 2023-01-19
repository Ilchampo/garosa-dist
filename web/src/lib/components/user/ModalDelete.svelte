<script lang="ts">
    import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
    import { Alert } from '@skeletonlabs/skeleton';
    import { enhance } from '$app/forms';
    import { modalStore } from '@skeletonlabs/skeleton';
    export let parent: any;
    const data = $modalStore[0].meta.user;
</script>

<div class="card">
    <div class="card-header">
        <div class="flex flex-row items-center gap-4">
			<SvgIcon name="user" width="w-14" height="h-14" fill="fill-primary-400" />
			<div>
				<h2>Delete User</h2>
				<em>Are you sure you want to delete user?</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
    </div>
    
    <form use:enhance method="POST" action='/users?/delete'>
        <div class="card-body">
            <Alert>
                <svelte:fragment slot="lead">
                    <SvgIcon name="warning" width="w-20" height="h-20" fill="fill-warning-400" />
                </svelte:fragment>
                <svelte:fragment slot="title">Warning!</svelte:fragment>
                <span>This actions will have as consequence delete the user <b>{data.firstName} {data.lastName}</b> from the system!</span>
            </Alert>
            <input type="number" name="user" value={data.id} hidden>
        </div>
        
        <div class="card-footer">
            <div class="flex gap-4 justify-end">
                <button type="button" class="btn btn-filled-primary w-40" on:click={parent.onClose}>Cancel</button>
                <button type="submit" class="btn btn-filled-secondary w-40" on:click={parent.onClose}>Delete</button>
            </div>
        </div>
    </form>
</div>