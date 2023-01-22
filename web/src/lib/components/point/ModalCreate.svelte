<script lang="ts">
    import { enhance } from '$app/forms';
	import { appConfig } from '$lib/config';
	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	export let parent: any;
</script>

<div class="card">
	<!-- Header -->
    <div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="plus" width="w-14" height="h-14" fill="fill-primary-400" />
			<div>
				<h2>Create Distribution Point</h2>
				<em>Enter the following fields</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>
	<form action="">
		<!-- Body -->
		<div class="card-body">

		</div>

		<!-- Footer -->
		<div class="card-footer">

		</div>
	</form>
</div>