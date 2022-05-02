<script lang="ts">
	import axios from 'axios';
	import { coins, pokemons } from '../store';
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
	export let i: number;

	const handleUpgrade = (id: number, name: string, forms: Array<{ name: string }>) => {
		if (($coins < 200 && i === 1) || ($coins < 300 && i === 2)) {
			return console.log('No enough coins');
		}
		if (i === 1) {
			coins.update((c) => c - 200);
		} else if (i === 2) {
			coins.update((c) => c - 300);
		}
		const index: number = $pokemons.findIndex(
			(data: { name: string }) => data.name === forms[0].name
		);
		console.log($coins);
		const subIndex = i;
		charForms[subIndex].isCatched = true;

		const accessToken = window.localStorage.getItem('MyToken');
		axios.post(
			'https://poki-click.herokuapp.com/upgrade',
			{ id, index, subIndex, coins: $coins },
			{
				headers: {
					authorization: 'Bearer ' + accessToken
				}
			}
		);
		dispatch('upgrade', {
			charForms
		});
	};
</script>

<button
	class="py-2 px-4 rounded-md bg-slate-500 text-white"
	on:click={() => handleUpgrade(charId, charName, charForms)}
>
	Upgrade
</button>
