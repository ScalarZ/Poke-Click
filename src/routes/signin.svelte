<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import * as jwt from 'jose';

	let email: string, password: string;
	let isValid = true;

	const hundleLogIn = async (email: string, password: string): Promise<void> => {
		try {
			const res = await axios.post('http://localhost:8080/signin', { email, password });
			window.localStorage.setItem('MyToken', res.data);
			const data = jwt.decodeJwt(res.data);
			goto('/' + data.id + '/click/');
		} catch (err) {
			isValid = false;
		}
	};

	onMount(() => {
		const accessToken = window.localStorage.getItem('MyToken');

		if (accessToken) {
			const data = jwt.decodeJwt(accessToken);
			goto('/' + data.id + '/click/');
		}
	});
</script>

<main class="min-h-screen flex justify-center items-center">
	<form class="flex flex-col space-y-8">
		<label for="email" class="flex flex-col">
			<span> Email </span>
			<input
				id="email"
				bind:value={email}
				type="text"
				required
				class="py-0.5 px-2 border border-gray-400"
			/>
		</label>
		<label for="password" class="flex flex-col">
			<span> Password </span>
			<input
				id="password"
				bind:value={password}
				type="password"
				required
				class="py-0.5 px-2 border border-gray-400"
			/>
		</label>
		<button
			class="m-auto py-1 px-4 rounded bg-zinc-700 text-white"
			on:click|preventDefault={() => hundleLogIn(email, password)}
		>
			Log in
		</button>
		{#if !isValid}
			<span class="text-red-600 text-center">email or password is wrong</span>
		{/if}
	</form>
</main>
