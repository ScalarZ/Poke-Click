<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const path = window.location.pathname;
		console.log(path);
		goto(path + '/click');
	});
</script>
