<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { coins, error, loading } from '../../store';

	loading.set(true);

	const updateCoins = () => {
		const interval = setInterval(async () => {
			console.log('start');
			const accessToken = window.localStorage.getItem('MyToken');
			await axios.post(
				'http://localhost:8080/coins',
				{ coins: $coins },
				{
					headers: {
						authorization: 'Bearer ' + accessToken
					}
				}
			);
			console.log('finish');
		}, 5000);
		onDestroy(() => clearInterval(interval));
	};
	updateCoins();

	const incrementCounter = (): void => {
		coins.update((c) => c + 1);
	};

	onMount(async () => {
		const accessToken = window.localStorage.getItem('MyToken');

		if (accessToken) {
			try {
				const { data } = await axios.get('http://localhost:8080/click/', {
					headers: {
						authorization: 'Bearer ' + accessToken
					}
				});
				loading.set(false);
				coins.set(data.coins);
			} catch (err) {
				goto('/');
			} finally {
			}
		} else {
			goto('/');
		}
	});
</script>

<div class="mx-auto">
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
