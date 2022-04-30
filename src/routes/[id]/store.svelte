<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import * as jwt from 'jose';

	import { coins, error, loading, pokemons } from '../../store';

	loading.set(true);

	const buyWith100 = async (): Promise<void> => {
		const random = Math.floor(Math.random() * 100);
		const accessToken = window.localStorage.getItem('MyToken');

		const data = await axios.post(
			'http://localhost:8080/catch',
			{ index: random },
			{
				headers: {
					authorization: 'Bearer ' + accessToken
				}
			}
		);

		console.log(data);
		coins.update((c): number => {
			if (c >= 0) {
				return c - 0;
			}
			return c;
		});
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
				pokemons.set(data.collections);
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
				<div
					class="mb-[1vh] w-[25%] rounded-full bg-slate-500 cursor-pointer aspect-square"
					on:click={buyWith100}
				/>
				<h2 class="text-4xl font-medium text-center">100</h2>
			</div>
			<div class="flex flex-col items-center">
				<div class="mb-[1vh] w-[25%] rounded-full bg-slate-500 cursor-pointer aspect-square" />
				<h2 class="text-4xl font-medium text-center">500</h2>
			</div>
		{/if}
	</div>
</div>
