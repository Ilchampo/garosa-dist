<script lang="ts">
	// import type { PageData } from './$types';

	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	// export let data: PageData;
</script>

<div class="content-container">
	<div class="card h-full overflow-y-scroll md:max-h-full">
		<div class="card-header">
			<div class="flex items-center">
				<SvgIcon name="house" width="w-14" height="h-14" fill="fill-secondary-500" />
				<div class="ml-4">
					<h2>Dashboard</h2>
					<hr class="!border-t-1" />
					<em>Welcome to your Garosa Dist dashboard</em>
				</div>
			</div>
		</div>
	</div>
</div>
