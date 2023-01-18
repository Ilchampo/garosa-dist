<script>
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import bundle from '$lib/translations/en-Us.json';
</script>

<div class="p-4">
	<h3>{bundle.components.global.loader.title}</h3>
	<ProgressBar label={bundle.components.global.loader.retrieving} rounded="rounded" />
</div>
