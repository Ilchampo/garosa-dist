<script lang="ts">
	import { enhance } from '$app/forms';
	import { GradientHeading } from '@skeletonlabs/skeleton';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="card signin">
		<header class="card-header space-y-4">
			<GradientHeading tag="h2" direction="bg-gradient-to-r" from="from-primary-500" to="to-secondary-500">
				Welcome to Garosa Dist Web
			</GradientHeading>
			<h2>Sign In</h2>
			<p>Sign in using your credentials to get access</p>
		</header>

		<div class="p-4">
			<form use:enhance method="POST">
				<label for="email" class="my-2">
					<span>Email</span>
					<input type="email" name="email" id="email" minlength="5" required />
				</label>
				<label for="password" class="my-2">
					<span>Password</span>
					<input type="password" name="password" id="password" minlength="8" required />
				</label>
				<button type="submit" class="btn btn-filled-primary btn-base w-full my-4">Sign In</button>
			</form>
		</div>
	</div>
</div>
