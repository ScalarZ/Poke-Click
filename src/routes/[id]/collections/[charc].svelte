<script context="module">
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import * as jwt from 'jose';
	import { coins, error, loading, pokemons } from '../../../store';
	import PokeFrom from '../../../components/PokeFrom.svelte';
	import Upgrade from '../../../components/Upgrade.svelte';

	interface Form {
		image: string;
		name: string;
		isCatched: boolean;
		id: number;
		gif: string;
	}

	interface Detail {
		name: string;
		isCatched: boolean;
		id: number;
		index: number;
		charForms: Array<Form>;
	}

	loading.set(true);

	export let forms: Array<Form>;
	let name = forms[0].name;
	let isCatched = forms[0].isCatched;
	let id = forms[0].id;
	let index = 0;
	let userId = '';

	let isFirstVersionCatched = forms[0].isCatched;

	const selectPokemon = (event: { detail: Detail }) => {
		name = event.detail.name;
		isCatched = event.detail.isCatched;
		id = event.detail.id;
		index = event.detail.index;
	};
	const upgragePokemon = (event: { detail: Detail }) => {
		forms = event.detail.charForms;
		isCatched = true;
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

<div>
	{#if $loading}
		{#if $error}
			<h2 class="pt-6 text-xl text-center text-red-500">Failed to load collections</h2>
		{:else}
			<h2 class="pt-6 text-xl text-center">Loading...</h2>
		{/if}
	{:else}
		<h1 class="pt-[10vh] text-2xl text-center font-semibold">
			{#if isCatched}
				{name}
			{:else}
				???
			{/if}
		</h1>
		<div class="mt-6 text-center">coins: {$coins}</div>
		<div class="mt-[5vh] w-full flex flex-wrap justify-center">
			{#each forms as { id, image, name, isCatched, gif }, index}
				<PokeFrom {image} {id} {name} {isCatched} {index} {gif} on:select={selectPokemon} />
			{/each}
		</div>
		<div class="mt-24 flex flex-col justify-center items-center">
			{#if !isFirstVersionCatched}
				<a class="py-2 px-4 rounded-md bg-slate-500 text-white" href={'/' + userId + '/store'}>
					Go to store
				</a>
			{:else if !isCatched && forms[index - 1].isCatched}
				<Upgrade
					charId={id}
					charName={name}
					charForms={forms}
					i={index}
					on:upgrade={upgragePokemon}
				/>
				<sapn class="mt-4 text-lg font-bold">
					{#if index === 1}
						200
					{:else}
						300
					{/if}
				</sapn>
			{:else if !isCatched}
				<h3>You have to upgrade the previous Pokemon</h3>
			{:else}
				<h3>{name + ' ' + id}</h3>
			{/if}
		</div>
	{/if}
</div>
