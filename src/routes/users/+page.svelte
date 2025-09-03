<script lang="ts">
	import Modal from './modal.svelte';
	import { 
		users, 
		remove, 
		setCurrentPage, 
		paginatedUsers, 
		filteredUsers,
		currentPage, 
		totalPages, 
		nextPage, 
		previousPage, 
		hasNext, 
		hasPrevious,
		searchTerm,
		statusFilter,
		roleFilter
	} from '../../stores/useStore';
	import List from './list.svelte';
	import AddUser from './add-user.svelte';

	let userModal = $state(false);
	const toggleModal = () => (userModal = !userModal);

	
	const handleStatus = (type: string) => {
		statusFilter.set(type);
	};

	const handleRole = (type: string) => {
		roleFilter.set(type);
	};
</script>

<div class="p-6">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold text-gray-900">User Management</h2>
			<p class="text-gray-600">Manage your platform users and their permissions.</p>
		</div>
		<button
			onclick={toggleModal}
			class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
		>
			Add New User
		</button>
	</div>

	<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
		<div class="border-b border-gray-200 p-6">
			<div class="flex items-center justify-between">
				<h3 class="text-lg font-semibold text-gray-900">All Users</h3>
				<div class="flex items-center space-x-4">
					<input
						type="text"
						placeholder="Search users..."
						bind:value={$searchTerm}
						class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
					<select
						class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
						bind:value={$roleFilter}
						onchange={(e) => handleRole((e.target as HTMLSelectElement).value)}
					>
						{#each ['All Roles', 'Admin', 'Editor', 'User'] as _role}
							<option value={_role}>{_role}</option>
						{/each}
					</select>
					<select
						class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
						bind:value={$statusFilter}
						onchange={(e) => handleStatus((e.target as HTMLSelectElement).value)}
					>
						{#each ['All Status', 'Active', 'Inactive', 'Pending'] as _status}
							<option value={_status}>{_status}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<div class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-gray-50">
					<tr>
						{#each ['User', 'Role', 'Status', 'Actions'] as column}
							<th class="px-6 py-3 text-left font-medium text-gray-700">{column}</th>
						{/each}
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					{#each $paginatedUsers as user}
						<List {...user} deleteUser={() => remove(user.id)} />
					{/each}
				</tbody>
			</table>
		</div>

		<div class="flex items-center justify-between border-t border-gray-200 px-6 py-3">
			<p class="text-sm text-gray-700">
				Showing {$paginatedUsers.length} of {$filteredUsers.length} users
			</p>
			<div class="flex space-x-2">
				<button 
					class="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 {$hasPrevious ? '' : 'opacity-50 cursor-not-allowed'}"
					onclick={previousPage}
					disabled={!$hasPrevious}
				>
					Previous
				</button>
				
				{#each Array($totalPages).fill(0) as _, i}
					<button 
						class="rounded px-3 py-1 text-sm transition-colors {$currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}"
						onclick={() => setCurrentPage(i + 1)}
					>
						{i + 1}
					</button>
				{/each}
				
				<button 
					onclick={nextPage}  
					class="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 {$hasNext ? '' : 'opacity-50 cursor-not-allowed'}"
					disabled={!$hasNext}
				>
					Next
				</button>
			</div>
		</div>
	</div>
</div>

{#if userModal}
	<Modal modal={userModal} {toggleModal} title="Add New User">
		<AddUser {toggleModal} />
	</Modal>
{/if}