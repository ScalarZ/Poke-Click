<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// export let gif: string;
	export let id: number;
	export let name: string;
	export let isCatched: boolean;
	export let src: string;


	const handleSelect = () =>
		dispatch('select', {
			name,
			isCatched,
			id
		});
</script>

<div
	class="card h-24 w-24 m-2 rounded border-opacity-50 cursor-pointer flex justify-center items-center"
	on:click={handleSelect}
>
	<img style={`filter:${isCatched ? 'contrast(1)' : 'contrast(0)'}`} {src} alt={id.toString()} />
</div>

<style>
	div {
		background-color: #b3b1ff31;
	}
</style>
