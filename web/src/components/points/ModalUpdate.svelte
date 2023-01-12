<script lang="ts">
	export let parent: any;
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { PointInterface } from '$lib/interfaces/pointInterface';
	const pointData = $modalStore[0].meta.point as PointInterface;
    let pointName = pointData.pointName;
    let pointDescription = pointData.pointDescription;
    function submitForm() {
        parent.onClose();
    }
</script>

<div class="card flex-col justify-center">
	<div class="card-header">
		<div class="flex items-center">
			<img src={pointData.pointImage} alt={pointData.pointName} class="point_image">
			<div class="flex-col ml-4">
				<h2>{pointData.pointName}</h2>
				<p>{pointData.pointDescription}</p>
				<em>{pointData.latitude} {pointData.longitude}</em>
			</div>
		</div>
	</div>

    <form action="" class="form p-4">
        <label for="name">
            <span>Name</span>
            <input type="text" id="pointName" minlength="2" bind:value={pointName} required placeholder={pointData.pointName}>
        </label>
        <label for="name">
            <span>Name</span>
            <input type="text" id="pointDescription" minlength="2" bind:value={pointDescription} required placeholder={pointData.pointDescription}>
        </label>
    </form>

	<div class="card-footer flex justify-center gap-4">
		<button class="btn btn-filled-secondary btn-base" on:click={parent.onClose}>Cancel</button>
        <button class="btn btn-filled-primary btn-base" on:click={submitForm}>Update</button>
	</div>
</div>
