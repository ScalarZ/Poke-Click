<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let gif: string;
	export let image: string;
	export let id: number;
	export let name: string;
	export let isCatched: boolean;
	export let src = image;
	export let index: number;

	const handleSelect = () => {
		dispatch('select', {
			name,
			isCatched,
			id,
			index
		});
	};
	const startAnimation = () => {
		if (isCatched) {
			src = gif;
		}
	};
	const stopAnimation = () => {
		src = image;
	};
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
	class="card h-24 w-24 m-2 rounded border-opacity-50 cursor-pointer flex justify-center items-center"
	on:click={handleSelect}
	on:mouseover={startAnimation}
	on:mouseleave={stopAnimation}
>
	<img
		id={id.toString()}
		style={`filter:${isCatched ? 'contrast(1)' : 'contrast(0)'}`}
		{src}
		alt={id.toString()}
		draggable={false}
	/>
</div>

<style>
	div {
		background-color: #b3b1ff31;
	}
	div:hover {
		border: 1px solid #6c6c7531;
		transform: scale(1.1);
	}
</style>
