<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import * as jwt from 'jose';

	import { coins, error, loading, pokemons } from '../../store';

	loading.set(true);
	let userId: any;
	let popup = false;
	let src: string;
	let imageLoading = true;

	const buyWith100 = async (): Promise<void> => {
		imageLoading = true;
		src = '';
		if ($coins >= 100) {
			const random = Math.floor(Math.random() * 100);
			const accessToken = window.localStorage.getItem('MyToken');
			popup = true;
			coins.update((c) => c - 100);
			const { data } = await axios.post(
				'http://localhost:8080/catch',
				{ index: random },
				{
					headers: {
						authorization: 'Bearer ' + accessToken
					}
				}
			);
			src = data.catshedPokemon.wallpaper.front_default;
			imageLoading = false;
			console.log(data.catshedPokemon.image);
			return;
		}
		console.log('No enough coins');
	};
	const handleLogOut = () => {
		window.localStorage.removeItem('MyToken');
	};
	const removeWindow = () => {
		popup = false;
	};
	onMount(async () => {
		const accessToken = window.localStorage.getItem('MyToken');
		if (accessToken) {
			try {
				const { data } = await axios.get('http://localhost:8080/collections/', {
					headers: {
						authorization: 'Bearer ' + accessToken
					}
				});
				const user: any = jwt.decodeJwt(accessToken);
				userId = user.id;
				pokemons.set(data.collections);
				coins.set(data.coins);
				console.log(data.coins);
				loading.set(false);
			} catch (err) {
				error.set(true);
			}
		} else {
			goto('/');
		}
	});
</script>

<div class="mx-auto">
	<header class="mx-auto px-8 py-4 flex justify-between bg-slate-300">
		<h2>Logo</h2>
		<nav>
			<ul class="space-x-4 flex list-none">
				<li>
					<a href={'/' + userId + '/click'}>Click</a>
				</li>
				<li>
					<a href={'/' + userId + '/collections'}>collections</a>
				</li>
				<li>
					<a href={'/' + userId + '/store'}>store</a>
				</li>
				<li on:click={handleLogOut}>
					<a href="/">log out</a>
				</li>
			</ul>
		</nav>
	</header>
	<h1 class="pt-[8vh] text-5xl font-bold text-center">Store</h1>
	<div class="mt-[10vh] w-full space-y-[5vh]">
		{#if $loading}
			{#if $error}
				<h2 class="pt-6 text-xl text-center text-red-500">Failed to load collections</h2>
			{:else}
				<h2 class="pt-6 text-xl text-center">Loading...</h2>
			{/if}
		{:else}
			<div class="flex flex-col items-center">
				<span>coins: {$coins}</span>
				<div
					class="mb-[1vh] w-[25%] rounded-full bg-slate-500 cursor-pointer aspect-square"
					on:click={buyWith100}
				/>
				<h2 class="text-4xl font-medium text-center">100</h2>
			</div>
			{#if popup}
				<div
					on:click={removeWindow}
					class="absolute p-4 h-80 w-80 top-1/2 left-1/2 border border-slate-400 rounded-lg transform -translate-x-1/2 -translate-y-1/2 bg-slate-200"
				>
					<!-- svelte-ignore a11y-missing-attribute -->
					{#if imageLoading}
						<div class="text-center">Loading...</div>
					{:else}
						<img class="h-full w-full object-contain" {src} />
					{/if}
				</div>
			{/if}
		{/if}
	</div>
</div>
