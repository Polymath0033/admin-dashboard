<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		
		goto('/dashboard');
	});
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="text-center">
		<div class="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
		<p class="text-gray-600">Redirecting to dashboard...</p>
	</div>
</div>