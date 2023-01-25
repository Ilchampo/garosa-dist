<script lang="ts">
    import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import type { RoutePointInterface } from '$lib/server/interfaces/routePointInterface';
	import type { PermissionInterface } from '$lib/server/interfaces/permissionInterface';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';

    import { Modals } from '$lib/enums';
	import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { tableInteraction, tableA11y, Paginator } from '@skeletonlabs/skeleton';
	import { modalStore, tooltip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
    
    import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	import Loader from '$lib/components/global/Loader.svelte';

    export let data: PageData;
	export let form: ActionData;

    let perms: PermissionInterface | null = null;
	let isLoading = true;
	let isPopulated = false;

    onMount(async () => {
		perms = data.payload.user as PermissionInterface;
		isPopulated = data.payload.routePoints.length > 0;
		isLoading = false;
	});

    const pagination = { offset: 0, limit: 5, size: 0, amounts: [5, 7, 10] };
	const dataTableStore = createDataTableStore(data.payload.routePoints as RoutePointInterface[], {
		search: '',
		sort: '',
		pagination
	});
	dataTableStore.subscribe((model) => dataTableHandler(model));

	function clearSearchParams(): void {
		$dataTableStore.search = '';
	}
</script>

<div class="card card-container">
    <!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="truck" width="w-14" height="h-14" fill="fill-primary-400" />
			<div>
				<h2>Route Panel</h2>
				<em>Information about selected route</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>
    
    <!-- Body -->
    <div class="card-body">

    </div>

    <!-- Footer -->
    <div class="card-footer">

    </div>
</div>