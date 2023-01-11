<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { GradientHeading } from '@skeletonlabs/skeleton';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/">
			<GradientHeading tag="h3" direction="bg-gradient-to-r" from="from-primary-500" to="to-secondary-500">
				G A R O S A D I S T
			</GradientHeading>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch />
	</svelte:fragment>
</AppBar>