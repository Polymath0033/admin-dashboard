<script lang="ts">
	import { add, toast } from '../../stores/useStore';
	import type { Role, Status } from '../../types';

	let { toggleModal} = $props();
	let name = $state('');
	let email = $state('');
	let role: Role = $state('User');
	let status: Status = $state('Active');

	const handleSubmit = (event: Event) => {
		event.preventDefault();
		add({ name, email, role, status });
		toggleModal();
        toast.set({ type: 'success', message: 'User added successfully!' });
	};
</script>

<form onsubmit={handleSubmit} class="px-6 py-4 relative">
	<div class="space-y-4">

		<div>
			<label for="name" class="mb-1 block text-sm font-medium text-gray-700"> Full Name </label>
			<input
				id="name"
				type="text"
				bind:value={name}
				required
				class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
				placeholder="Enter full name"
			/>
		</div>


		<div>
			<label for="email" class="mb-1 block text-sm font-medium text-gray-700">
				Email Address
			</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				required
				class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
				placeholder="Enter email address"
			/>
		</div>

		<div>
			<label for="role" class="mb-1 block text-sm font-medium text-gray-700"> Role </label>
			<select
				id="role"
				bind:value={role}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
			>
				<option value="User">User</option>
				<option value="Editor">Editor</option>
				<option value="Admin">Admin</option>
			</select>
		</div>

		<div>
			<label for="status" class="mb-1 block text-sm font-medium text-gray-700"> Status </label>
			<select
				id="status"
				bind:value={status}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
			>
				<option value="Active">Active</option>
				<option value="Inactive">Inactive</option>
				<option value="Pending">Pending</option>
			</select>
		</div>
	</div>

	<div class="mt-6 flex space-x-3">
		<button
			type="button"
			onclick={toggleModal}
			class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		>
			Cancel
		</button>
		<button
			type="submit"
			class="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		>
			Add User
		</button>
	</div>
</form>
