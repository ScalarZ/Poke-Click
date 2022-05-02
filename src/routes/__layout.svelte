<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import * as jwt from 'jose';

	import '../app.css';
	let id;

	const handleLogOut = () => {
		window.localStorage.removeItem('MyToken');
	};

	onMount(() => {
		const accessToken = window.localStorage.getItem('MyToken');
		if (accessToken) {
			const data = jwt.decodeJwt(accessToken);
			id = data.id;
		}
	});
</script>

<main class="mx-auto min-h-screen max-w-xl">
	<slot />
</main>
