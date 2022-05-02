<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const path = window.location.pathname;
		goto(path + '/click');
	});
</script>
