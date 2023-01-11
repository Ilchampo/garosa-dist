<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { GradientHeading } from '@skeletonlabs/skeleton';
	import SvgIcon from '../SvgIcon/SvgIcon.svelte';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/" class="flex">
			<span style="margin: 0 0.5rem;">
				<SvgIcon name="road" width="w-10" height="h-10" fill="fill-primary-500" />
			</span>
			<GradientHeading tag="h2" direction="bg-gradient-to-r" from="from-primary-500" to="to-secondary-500">
				G A R O S A D I S T
			</GradientHeading>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch />
	</svelte:fragment>
</AppBar>
