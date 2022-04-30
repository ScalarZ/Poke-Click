<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import * as jwt from 'jose';
	import { pokemons, loading, error } from '../../store';
	import axios from 'axios';
	import PokeCard from '../../components/PokeCard.svelte';

	loading.set(true);
	let userId: string;

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
