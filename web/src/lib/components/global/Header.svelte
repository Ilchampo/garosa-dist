<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { GradientHeading } from '@skeletonlabs/skeleton';

	import bundle from '$lib/translations/en-Us.json';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/">
			<GradientHeading tag="h3" direction="bg-gradient-to-r" from="from-tertiary-500" to="to-secondary-500">
				{bundle.components.global.header.title}
			</GradientHeading>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch />
	</svelte:fragment>
</AppBar>
