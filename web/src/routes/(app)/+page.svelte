<script lang="ts">
	import type { PageData } from './$types';
	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	export let data: PageData;
</script>

<div class="card card-container">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="house" width="w-14" height="h-14" fill="fill-secondary-500" />
			<div>
				<h2>Dashboard Panel</h2>
				<em>Welcome to your user dashboard</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	<!-- Body -->
	<div class="card-body">
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-1 flex-col gap-4">

			</div>
			<div class="flex flex-1 flex-col gap-4">
				<div class="flex">
					
				</div>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<div class="card-footer">
		<hr class="!border-t-2 my-4" />
	</div>
</div>