<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
    import { tableInteraction, tableA11y, Paginator } from '@skeletonlabs/skeleton';
    import Loader from '../../../components/common/Loader.svelte';
    import SvgIcon from '../../../components/SvgIcon/SvgIcon.svelte';
    
    export let data: PageData;
    let isLoading = true;
    onMount(async () => { isLoading = data ? false : true; });
    const points: any[] = data.payload;
    const dataTableStore = createDataTableStore(points, {
        search: '',
        sort: '',
        pagination: { offset: 0, limit: 7, size: 0, amounts: [5, 7, 10] }
    });
    dataTableStore.subscribe((model) => dataTableHandler(model));
    function clearParams() {
        $dataTableStore.search = '';
    }
</script>

<div class="content-container">
    <div class="card h-full overflow-y-scroll md:max-h-full">
        <div class="card-header">
            <div class="flex items-center">
                <SvgIcon name="location-dot" width="w-14" height="h-14" fill="fill-primary-500" />
                <div class="ml-4">
                    <h2>Distribution Points</h2>
                    <hr class="!border-t-1" />
                    <em>Manage distribution points in Garosa Dist</em>
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
                <div class="flex mb-4">
                    <button on:click={ clearParams } class="btn btn-filled-surface btn-base">Clear</button>
                    <input bind:value={$dataTableStore.search} type="search" placeholder="Search Table..." />
                    <button class="btn btn-filled-primary btn-base ml-4">Create</button>
                </div>
                <table class="table" role="grid" use:tableInteraction use:tableA11y>
                    <thead on:click={(e) => { dataTableStore.sort(e); }} on:keypress >
                        <tr>
                            <th>Point Name</th>
                            <th>Description</th>
                            <th data-sort="createdOn">Created On</th>
                            <th data-sort="updatedOn">Updated On</th>
                            <th class="table-cell-fit">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $dataTableStore.filtered as row, rowIndex}
                        <tr aria-rowindex={rowIndex + 1}>
                            <td role="gridcell" aria-colindex={0} tabindex="0" class="md:!whitespace-normal capitalize">
                                <div class="flex items-center">
                                    <img  class="table-image" src={ row.pointImage } alt={ row.pointName }>
                                    <a href="/points/{ row.id }">{ row.pointName }</a>
                                </div>
                            </td>
                            <td role="gridcell" aria-colindex={1} tabindex="0" class="md:!whitespace-normal capitalize">
                                { row.pointDescription }
                            </td>
                            <td role="gridcell" aria-colindex={2} tabindex="0">
                                { new Date(row.createdOn).toLocaleString('en-GB') }
                            </td>
                            <td role="gridcell" aria-colindex={3} tabindex="0">
                                { new Date(row.updatedOn).toLocaleString('en-GB') }
                            </td>
                            <td role="gridcell" aria-colindex={4} tabindex="0">
                                A
                            </td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
                <div class="p-4">
                    <Paginator bind:settings={$dataTableStore.pagination} />
                </div>
            {/if}
        </div>
    </div>
</div>