<script lang="ts">
	import EditUser from './edit-user.svelte';
	import Modal from './modal.svelte';
	let {id, email, name, role, status, deleteUser } = $props();
	let deleteModal = $state(false);
	let editModal = $state(false);
    const toggleDeleteModal = () => (deleteModal = !deleteModal);
    const toggleEditModal = () => (editModal = !editModal);
</script>

<tr class="hover:bg-gray-50">
	<td class="px-6 py-4">
		<div class="flex items-center">
			<div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
				<span class="font-semibold text-blue-600">{name.charAt(0)}</span>
			</div>
			<div class="ml-3">
				<p class="font-medium text-gray-900">{name}</p>
				<p class="text-sm text-gray-500">{email}</p>
			</div>
		</div>
	</td>
	<td class="px-6 py-4">
		<span
			class="inline-flex rounded-full px-2 py-1 text-xs font-semibold {role === 'Admin'
				? 'bg-purple-100 text-purple-800'
				: role === 'Editor'
					? 'bg-blue-100 text-blue-800'
					: 'bg-gray-100 text-gray-800'}">{role}</span
		>
	</td>
	<td class="px-6 py-4">
		<span
			class="inline-flex rounded-full px-2 py-1 text-xs font-semibold {status === 'Active'
				? 'bg-green-100 text-green-800'
				: status === 'Inactive'
					? 'bg-red-100 text-red-800'
					: 'bg-yellow-100 text-yellow-800'}">{status}</span
		>
	</td>
	<td class="px-6 py-4">
		<div class="flex space-x-2">
			
			<button class="text-sm font-medium text-blue-600 hover:text-blue-900" onclick={toggleEditModal}>Edit</button>
			
			<button class="text-sm font-medium text-red-600 hover:text-red-900" onclick={toggleDeleteModal}>Delete</button>
		</div>
	</td>
</tr>
{#if editModal}
	<Modal modal={editModal} title="Edit User" toggleModal={toggleEditModal}>
		<EditUser userId={id} toggleModal={toggleEditModal} />
	</Modal>
{/if}
{#if deleteModal}
	<Modal modal={deleteModal} title="Confirm Delete" toggleModal={toggleDeleteModal}>
		<div class="px-6 py-4">
			<p class="mb-4">Are you sure you want to delete {name}?</p>
			<div class="flex justify-end space-x-2">
				<button
					type="button"
					onclick={toggleDeleteModal}
					class="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
				>
					Cancel
				</button>
				<button
					type="button"
					onclick={() => {
						deleteUser();
						deleteModal = false;
					}}
					class="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
				>
					Delete
				</button>
			</div>
		</div>
	</Modal>
{/if}
