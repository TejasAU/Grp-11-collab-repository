import { browser } from '$app/environment';
import { writable } from 'svelte/store';


let name = browser && localStorage.getItem('name');

export let nameStore = writable(name ? JSON.parse(name):'')

if(browser){
    nameStore.subscribe( u => localStorage.nameStore = u)
}