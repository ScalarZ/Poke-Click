<script context="module">
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import * as jwt from 'jose';
	import { error, loading, pokemons } from '../../../store';
	import PokeFrom from '../../../components/PokeFrom.svelte';
	import Upgrade from '../../../components/Upgrade.svelte';

	interface Form {
		image: string;
		name: string;
		isCatched: boolean;
		id: number;
	}

	interface Detail {
		name: string;
		isCatched: boolean;
		id: number;
		charForms: Array<Form>;
	}

	export let forms: Array<Form>;
	let name = forms[0].name;
	let isCatched = forms[0].isCatched;
	let id = forms[0].id;

	let isFirstVersionCatched = forms[0].isCatched;

	const selectPokemon = (event: { detail: Detail }) => {
		name = event.detail.name;
		isCatched = event.detail.isCatched;
		id = event.detail.id;
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

<div>
	<h1 class="pt-[10vh] text-2xl text-center font-semibold">
		{#if isCatched}
			{name}
		{:else}
			???
		{/if}
	</h1>
	<div class="mt-[5vh] w-full flex flex-wrap justify-center">
		{#each forms as { id, image, name, isCatched }}
			<PokeFrom src={image} {id} {name} {isCatched} on:select={selectPokemon} />
		{/each}
	</div>
	<div class="mt-24 flex justify-center">
		{#if !isFirstVersionCatched}
			<button class="py-2 px-4 rounded-md bg-slate-500 text-white"> Go to store </button>
		{:else if !isCatched}
			<Upgrade charId={id} charName={name} charForms={forms} on:upgrade={upgragePokemon} />
		{:else}
			<h3>{name + ' ' + id}</h3>
		{/if}
	</div>
</div>
