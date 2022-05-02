<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import * as jwt from 'jose';
	import { pokemons, loading, error } from '../../store';
	import axios from 'axios';
	import PokeCard from '../../components/PokeCard.svelte';

	loading.set(true);
	let userId: string;
	const handleLogOut = () => {
		window.localStorage.removeItem('MyToken');
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
	<h1 class="pt-[8vh] text-5xl font-bold text-center">Collections</h1>
	<div class="mt-[10vh] w-full flex flex-wrap justify-center">
		{#if $loading}
			{#if $error}
				<h2 class="pt-6 text-xl text-center text-red-500">Failed to load collections</h2>
			{:else}
				<h2 class="pt-6 text-xl text-center">Loading...</h2>
			{/if}
		{:else}
			{#each $pokemons as { id, image, name, isCatched } (id)}
				<PokeCard src={image} {id} href={name} {isCatched} {userId} />
			{/each}
		{/if}
	</div>
</div>
