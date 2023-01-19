<script lang="ts">
    import { modalStore } from '@skeletonlabs/skeleton';
    import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
    export let parent: any;
</script>

<div class="card">
    <div class="card-header">
        <div class="flex flex-row items-center gap-4">
			<SvgIcon name="plus" width="w-14" height="h-14" fill="fill-primary-400" />
			<div>
				<h2>Created New User</h2>
				<em>{$modalStore[0].meta.data.msg}</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
    </div>

    <div class="card-content">
        {$modalStore[0].meta.data.payload.email}
        {$modalStore[0].meta.data.payload.password}
    </div>

    <div class="card-footer">
        <div class="flex justify-end">
            <button type="submit" class="btn btn-filled-secondary w-40" on:click={parent.onClose}>Close</button>
        </div>
    </div>
</div>