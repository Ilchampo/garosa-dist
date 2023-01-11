<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import Loader from '../../../../components/common/Loader.svelte';
    import SvgIcon from '../../../../components/SvgIcon/SvgIcon.svelte';

    export let data: PageData;
    let isLoading = true;
    onMount(async () => { isLoading = data ? false : true; });
    const point = data.payload;
</script>

<div class="content-container">
    <div class="card h-full overflow-y-scroll md:max-h-full">
        <div class="card-header">
            <div class="flex items-center">
                <SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-primary-500" />
                <div class="ml-4">
                    <h2>Distribution Point</h2>
                    <hr class="!border-t-1" />
                    <em>Information about distribution point</em>
                </div>
            </div>
        </div>
        <div class="card-body">
            {#if isLoading}
                <Loader />
            {:else if !data.payload}
            <div class="not-found">
                <SvgIcon name="magnifying-glass" width="w-20" height="h-20" fill="fill-surface-500" />
                <h3>{data.msg}</h3>
            </div>
            {:else}
                <div class="grid grid-cols-2 gap-4 h-full">
                    <div class="point_map">
                        a
                    </div>
                    <div>2</div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .point_map {
        background: black;
        height: 100%;
        border-radius: 1rem;
    }
</style>