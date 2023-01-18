<script lang="ts">
	import type { UserInterface } from '$lib/server/interfaces/userInterface';
	import { modalStore } from '@skeletonlabs/skeleton';
	export let parent: any;

	const data = $modalStore[0].meta.user as UserInterface;
</script>

<div class="">
	<div class="card-header" />
	<div class="card-footer">
		<div class="card-footer flex justify-center">
			<button class="btn btn-filled-secondary btn-base" on:click={parent.onClose}>Close</button>
		</div>
	</div>
</div>
