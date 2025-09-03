<script lang="ts">
	import { user, searchTerm } from '../stores/useStore';
	import { page } from '$app/state';
	interface Props {
		toggleSidebar: () => void;
	
	}
	let { toggleSidebar }: Props = $props();
	const route = $derived(page.url.pathname);
	const handleSearch = (event: KeyboardEvent) => {
		const query = (event.target as HTMLInputElement).value;
		if (route === '/users') {
			searchTerm.set(query);
		}
	};
</script>

<header class="border-b border-gray-200 bg-white shadow-sm">
	<div class="flex h-16 w-full items-center justify-between px-6">
		<button onclick={toggleSidebar} class="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
			>{''}
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
		<div class="flex items-center space-x-4">
			<div class="relative">
				<input
					type="text"
					placeholder="Search..."
					onkeyup={handleSearch}
					class="w-64 rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
				<svg
					class="absolute top-2.5 left-3 h-5 w-5 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
			<div class="flex items-center space-x-3">
				<button class="relative p-2 text-gray-600 hover:text-gray-900">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 17h5l-5 5-5-5h5zm0 0V3"
						/>
					</svg>
					<span
						class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
						>{$user.notificationCount}</span
					>
				</button>
				<div class="flex items-center space-x-2">
					<img
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&rounded=full"
						alt="Profile"
						class="h-8 w-8 rounded-full"
					/>
					<span class="text-sm font-medium text-gray-700">{$user.siteName}</span>
				</div>
			</div>
		</div>
	</div>
</header>
