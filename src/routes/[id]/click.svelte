<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import * as jwt from 'jose';
	import { coins, error, loading } from '../../store';

	loading.set(true);
	let userId: any;

	const incrementCounter = (): void => {
		coins.update((c) => c + 100000);
	};
	const UpdateCoins = () => {
		const accessToken = window.localStorage.getItem('MyToken');

		axios.post(
			'https://poki-click.herokuapp.com/coins/',
			{ coins: $coins },
			{
				headers: {
					authorization: 'Bearer ' + accessToken
				}
			}
		);
	};
	const handleLogOut = () => {
		UpdateCoins();
		window.localStorage.removeItem('MyToken');
	};

	onMount(async () => {
		const accessToken = window.localStorage.getItem('MyToken');
		window.addEventListener('beforeunload', () =>
			axios.post(
				'https://poki-click.herokuapp.com/coins/',
				{ coins: $coins },
				{
					headers: {
						authorization: 'Bearer ' + accessToken
					}
				}
			)
		);
		if (accessToken) {
			try {
				const user = jwt.decodeJwt(accessToken);
				userId = user.id;
				const { data } = await axios.get('https://poki-click.herokuapp.com/click/', {
					headers: {
						authorization: 'Bearer ' + accessToken
					}
				});
				loading.set(false);
				coins.set(data.coins);
			} catch (err) {
				goto('/');
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
				<li on:click={UpdateCoins}>
					<a href={'/' + userId + '/collections'}>collections</a>
				</li>
				<li on:click={UpdateCoins}>
					<a href={'/' + userId + '/store'}>store</a>
				</li>
				<li on:click={handleLogOut}>
					<a href="/">log out</a>
				</li>
			</ul>
		</nav>
	</header>
	<h1 class="p-[8vh] text-5xl font-bold text-center">Poke-Click</h1>
	{#if $loading}
		{#if $error}
			<h2 class="pt-6 text-xl text-center text-red-500">Failed to load collections</h2>
		{:else}
			<h2 class="pt-6 text-xl text-center">Loading...</h2>
		{/if}
	{:else}
		<div class="mt-[12vh] w-full">
			<div class="flex flex-col items-center">
				<h2 class="text-4xl font-medium text-center">{$coins}</h2>
				<div
					class="mt-[2vh] w-[25%] rounded-full bg-slate-500 cursor-pointer aspect-square"
					on:click={incrementCounter}
				/>
			</div>
		</div>
	{/if}
</div>
