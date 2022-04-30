import { writable, type Writable } from 'svelte/store';

export const coins: Writable<number> = writable(0);

export const pokemons = writable([]);
export const loading = writable(true);
export const error = writable(false);
