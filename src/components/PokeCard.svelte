<script lang="ts">
	export let src: string;
	export let id: number;
	export let href: string;
	export let isCatched: boolean;
	export let userId: string;
</script>

<a
	href={'/' + userId + '/collections/' + href}
	class="card m-2 h-24 w-24 rounded border-opacity-50 cursor-pointer"
>
	<img
		style={`filter:${isCatched ? 'contrast(1)' : 'contrast(0)'}`}
		draggable={false}
		{src}
		alt={id.toString()}
	/>
</a>

<style>
	a {
		background-color: #b3b1ff31;
	}
	a:hover {
		border: 1px solid #6c6c7531;
	}
</style>
