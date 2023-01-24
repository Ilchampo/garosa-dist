<script lang="ts">
	import { appConfig } from '$lib/config';
	export let latitude: number;
	export let longitude: number;
	export let height: string | null;
</script>

<iframe
	title="Google Maps"
	width="100%"
	height={height ?? '350px'}
	style="border:0"
	loading="lazy"
	referrerpolicy="no-referrer-when-downgrade"
	src="https://www.google.com/maps/embed/v1/place?key={appConfig.key}
    &q={latitude},{longitude}"
/>
