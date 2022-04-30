<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const accessToken = window.localStorage.getItem('MyToken');

		if (accessToken) {
			goto('/click');
		}
	});
</script>

<main class="min-h-screen flex justify-center items-center">
	<div class="flex flex-col space-y-4">
		<a href="/signin" class="py-1 px-4 rounded border border-gray-500"> Sing in </a>
		<a href="/signup" class="py-1 px-4 rounded bg-zinc-700 text-white"> Sing up </a>
	</div>
</main>
