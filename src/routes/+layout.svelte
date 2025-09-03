<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { searchTerm } from '../stores/useStore';


	let { children } = $props();
	import Sidebar from '../components/sidebar.svelte';
	import Header from '../components/header.svelte';
	let menuItems = [
		{ id: 'dashboard', label: 'Dashboard', icon: '🏠' },
		{ id: 'users', label: 'Users', icon: '👥' },
		{ id: 'settings', label: 'Settings', icon: '⚙️' }
	];

	let sidebarOpen = $state(true);
	onMount(() => {
		if (window.innerWidth >= 1024) {
			sidebarOpen = false;
		}
	});


	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="flex">
	<Sidebar {menuItems} {sidebarOpen} {toggleSidebar} />

	<main class="min-h-screen flex-1 bg-gray-50 transition-all duration-300 lg:ml-64">
		<Header {toggleSidebar} />

		{@render children?.()}
	</main>
</div>
<button
	type="button"
	aria-label="Close sidebar overlay"
	class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden {sidebarOpen ? 'block' : 'hidden'}"
	onclick={toggleSidebar}
	tabindex="0"
></button>
            