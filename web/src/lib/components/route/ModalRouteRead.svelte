<script lang="ts">
    import type { RoutePointInterface } from '$lib/server/interfaces/routePointInterface';
    import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	import { modalStore } from '@skeletonlabs/skeleton';
	export let parent: any;
	const data = $modalStore[0].meta.routePoint as RoutePointInterface;
</script>

<div class="card">
    <!-- Header -->
    <div class="card-header">
        <div class="flex flex-row items-center gap-4">
			<SvgIcon name="file" width="w-14" height="h-14" fill="fill-secondary-500" />
			<div>
				<h2>Distribution Point Report</h2>
				<em>Information about the visited distribution point</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
    </div>

    <!-- Body -->
    <div class="card-body gap-4">
        <label for="reportTitle">
            <span>Report Title</span>
            <input type="text" readonly value={data.reportTitle}>
        </label>
        <div class="flex flex-1 justify-between gap-4">
            <label for="startTime" class="flex-1">
                <span>Start Time</span>
                <input type="text" readonly value={data.reportTitle}>
            </label>
            <label for="endTime" class="flex-1">
                <span>End Time</span>
                <input type="text" readonly value={data.reportTitle}>
            </label>
        </div>
        <label for="reportDescription">
            <span>Report Description</span>
            <textarea readonly class="h-40">{data.reportDescription}</textarea>
        </label>
        <div class="flex gap-4 overflow-x-scroll h-60">
            <img src={data.reportImageOne} alt={data.reportTitle} class="">
            <img src={data.reportImageTwo} alt={data.reportTitle} class="">
            <img src={data.reportImageThree} alt={data.reportTitle} class="">
        </div>
    </div>

    <!-- Footer -->
    <div class="card-footer">
        <hr class="!border-t-2 my-4" />
        <div class="flex gap-4 justify-end">
            <button type="button" class="btn btn-filled-surface w-40" on:click={parent.onClose}>Close</button>
        </div>
    </div>
</div>