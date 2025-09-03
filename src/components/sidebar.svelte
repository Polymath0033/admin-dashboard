<script lang="ts">
	import { page } from "$app/state";

	type Props = {
		menuItems: { id: string; label: string; icon: string }[];
		
		sidebarOpen: boolean;
		toggleSidebar: () => void;
       
	};
	let { menuItems, toggleSidebar, sidebarOpen }: Props = $props();
    let route = $derived(page.url.pathname);

</script>

<aside
	class="fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out {sidebarOpen
		? 'translate-x-0'
		: '-translate-x-full'} lg:translate-x-0"
>
	<div class="flex h-16 items-center justify-between bg-blue-600 px-6 text-white">
		<h1 class="text-xl font-semibold">Admin Panel</h1>
		<button onclick={toggleSidebar} class="lg:hidden">
			{' '}
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	</div>
	<nav class="mt-6">
		{#each menuItems as item}
            <a href={item.id} 
               class="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors {route.slice(1) === item.id ? '!bg-blue-100 !text-blue-600 !border-r-2 border-blue-600' : ''}">
				<span class="mr-3">${item.icon}</span>
				<span>${item.label}</span>
			</a>
        {/each}
	</nav>
</aside>

