<script lang="ts">
	import axios from 'axios';
	import { pokemons } from '../store';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	interface Pokemon {
		name: string;
		id: number;
		forms: Array<{ isCatched: boolean }>;
	}

	export let charId: number;
	export let charName: string;
	export let charForms: Array<{ name: string; isCatched: boolean }>;

	const handleUpgrade = (id: number, name: string, forms: Array<{ name: string }>) => {
		const index: number = $pokemons.findIndex(
			(data: { name: string }) => data.name === forms[0].name
		);

		const subIndex: number = forms.findIndex((data: { name: string }) => data.name == name);
		charForms[subIndex].isCatched = true;

		dispatch('upgrade', {
			charForms
		});

		const accessToken = window.localStorage.getItem('MyToken');
		axios.post(
			'http://localhost:8080/upgrade',
			{ id, index, subIndex },
			{
				headers: {
					authorization: 'Bearer ' + accessToken
				}
			}
		);
	};
</script>

<button
	class="py-2 px-4 rounded-md bg-slate-500 text-white"
	on:click={() => handleUpgrade(charId, charName, charForms)}
>
	Upgrade
</button>
