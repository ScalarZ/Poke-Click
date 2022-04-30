<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import * as jwt from 'jose';

	let username: string, email: string, password: string;

	const hundleSubmit = async (username: string, email: string, password: string): Promise<void> => {
		const res = await axios.post('http://localhost:8080/signup', { username, email, password });
		if (res.status == 201) {
			window.localStorage.setItem('MyToken', res.data);
			const data = jwt.decodeJwt(res.data);
			goto('/' + data.id + '/click/');
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
		<label for="username" class="flex flex-col">
			<span> Username </span>
			<input
				id="username"
				bind:value={username}
				type="text"
				required
				class="py-0.5 px-2 border border-gray-400"
			/>
		</label>
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
			on:click|preventDefault={() => hundleSubmit(username, email, password)}
		>
			Submit
		</button>
	</form>
</main>
