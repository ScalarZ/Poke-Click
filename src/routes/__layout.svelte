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
	<header class="mx-auto px-8 py-4 flex justify-between bg-slate-300">
		<h2>Logo</h2>
		<nav>
			<ul class="space-x-4 flex list-none">
				<li>
					<a href={'/' + id + '/click'}>Click</a>
				</li>
				<li>
					<a href={'/' + id + '/collections'}>collections</a>
				</li>
				<li>
					<a href={'/' + id + '/store'}>store</a>
				</li>
				<li on:click={handleLogOut}>
					<a href="/">log out</a>
				</li>
			</ul>
		</nav>
	</header>
	<slot />
</main>
