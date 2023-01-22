<script lang="ts">
	import type { ApplicationInterface } from '$lib/server/interfaces/applicationInterface';
	import type { PermissionInterface } from '$lib/server/interfaces/permissionInterface';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';

	import { tooltip } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	import SvgIcon from '$lib/components/SvgIcon/SvgIcon.svelte';
	import Loader from '$lib/components/global/Loader.svelte';

	export let data: PageData;
	export let form: ActionData;

	let perms: PermissionInterface | null = null;
	let config: ApplicationInterface | null = null;
	let isLoading = true;

	onMount(async () => {
		if (data.payload.config) {
			isLoading = false;
			config = data.payload.config as ApplicationInterface;
			perms = data.payload.user as PermissionInterface;
		}
	});
</script>

<div class="card card-container">
	<!-- Header -->
	<div class="card-header">
		<div class="flex flex-row items-center gap-4">
			<SvgIcon name="gear" width="w-14" height="h-14" fill="fill-primary-400" />
			<div>
				<h2>Settings Panel</h2>
				<em>Application and user settings</em>
			</div>
		</div>
		<hr class="!border-t-2 my-4" />
	</div>

	{#if isLoading}
		<Loader />
	{:else}
		<!-- Body -->
		<div class="card-body">
			{#if form}
				<div class="flex bg-primary-500/50 border border-primary-500 p-4 mb-4 justify-between items-center">
					<div class="flex">
						<SvgIcon name="user" width="w-14" height="h-14" fill="fill-primary-400" />
						<div class="flex flex-col ml-4">
							<h3>{form.request.msg}</h3>
						</div>
					</div>
					<button
						class="btn-icon btn-filled-secondary"
						use:tooltip={{ content: 'Dismiss', position: 'left' }}
						on:click={() => {
							location.reload();
						}}
					>
						<span> <SvgIcon name="check" width="w-8" height="h-6" fill="fill-primary-400" /> </span>
					</button>
				</div>
			{/if}
			<div class="grid grid-cols-2 gap-4">
				<!-- User Settings -->
				<div class="card">
					<div class="card-header">
						<div class="flex flex-row items-center gap-4">
							<SvgIcon name="user" width="w-10" height="h-10" fill="fill-primary-400" />
							<div>
								<h2>User Settings</h2>
								<em>Change user password</em>
							</div>
						</div>
						<hr class="!border-t-2 my-4" />
					</div>
					<form use:enhance method="POST" action="/settings?/password">
						<div class="card-body">
							<label for="currentPassword" class="my-2">
								<span>Current Password</span>
								<input
									type="password"
									name="currentPassword"
									id="currentPassword"
									minlength="8"
									required
								/>
							</label>
							<label for="newPassword" class="my-2">
								<span>New Password</span>
								<input type="password" name="newPassword" id="newPassword" minlength="8" required />
							</label>
							<label for="confirmPassword" class="my-2">
								<span>Confirm Password</span>
								<input
									type="password"
									name="confirmPassword"
									id="confirmPassword"
									minlength="8"
									required
								/>
							</label>
						</div>
						<div class="card-footer">
							<hr class="!border-t-2 my-4" />
							<button type="submit" class="btn btn-filled-primary w-full">Change Password</button>
						</div>
					</form>
				</div>

				<!-- Application Settings -->
				<div class="card">
					<div class="card-header">
						<div class="flex flex-row items-center gap-4">
							<SvgIcon name="computer" width="w-10" height="h-10" fill="fill-primary-400" />
							<div>
								<h2>Application Settings</h2>
								<em>List of application settings</em>
							</div>
						</div>
						<hr class="!border-t-2 my-4" />
					</div>
					<form use:enhance method="POST" action="/settings?/update">
						<div class="card-body">
							<div class="flex w-full gap-4 justify-between my-2">
								<label for="maxRadius" class="flex-1">
									<span>Maximum Radius From Point (Meters)</span>
									<input
										type="number"
										name="maxRadius"
										id="maxRadius"
										min="1"
										max="10000"
										required
										value={config?.maxRadius}
										disabled={!perms?.updateApplicationConfiguration}
									/>
								</label>
								<label for="maxPointsPerRoute" class="flex-1">
									<span>Maximum Distribution Points Per Route</span>
									<input
										type="number"
										name="maxPointsPerRoute"
										id="maxPointsPerRoute"
										min="1"
										max="100"
										required
										value={config?.maxPointsPerRoute}
										disabled={!perms?.updateApplicationConfiguration}
									/>
								</label>
							</div>
							<label for="language" class="my-2">
								<span>Language</span>
								<select
									name="language"
									id="language"
									required
									disabled={!perms?.updateApplicationConfiguration}
								>
									<option value="en-US">English</option>
								</select>
							</label>
						</div>
						<div class="card-footer">
							<hr class="!border-t-2 my-4" />
							<button
								type="submit"
								class="btn btn-filled-secondary w-full"
								disabled={!perms?.updateApplicationConfiguration}>Update Settings</button
							>
						</div>
					</form>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<div class="card-footer">
			<hr class="!border-t-2 my-4" />
		</div>
	{/if}
</div>
