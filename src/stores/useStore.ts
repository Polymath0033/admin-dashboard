import { writable, derived, get, type Writable } from 'svelte/store';
import type { Users, Timezone } from '../types';

const user = writable({
	siteName: 'Admin user',
	email: 'adminuser@gmail.com',
	timezone: 'UTC' as Timezone,
	notificationCount: 3,
	notifications: { email: true, sms: false, push: true }
});

const toast = writable<{ type: 'success' | 'error'; message: string } | null>(null);
const showToast = writable(false);

const toastHandler = (type: 'success' | 'error', message: string) => {
	toast.set({ type, message });
	showToast.set(!showToast);
};

const searchTerm = writable<string>('');
const statusFilter = writable<string>('All Status');
const roleFilter = writable<string>('All Roles');

const updateUser = (newUser: {
	siteName?: string;
	email?: string;
	timezone?: Timezone;
	notifications?: { email?: boolean; sms?: boolean; push?: boolean };
}) => {
	user.update((current) => ({
		...current,
		...newUser,
		notifications: {
			email: newUser.notifications?.email ?? current.notifications.email,
			sms: newUser.notifications?.sms ?? current.notifications.sms,
			push: newUser.notifications?.push ?? current.notifications.push
		}
	}));
};

const users: Writable<Users[]> = writable([
	{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
	{ id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive' },
	{ id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', status: 'Active' },
	{ id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'User', status: 'Pending' }
]);

const addNewUser = (newUser: { name: string; email: string; role: Users['role']; status: Users['status'] }) => {
	users.update((current) => {
		const newId = Math.max(...current.map(u => u.id), 0) + 1;
		return [...current, { id: newId, ...newUser }];
	});
};

const removeUser = (id: number) => {
	users.update((current) => {
		const userToRemove = current.find(user => user.id === id);
		const filtered = current.filter((user) => user.id !== id);
		if (userToRemove) {
			toastHandler('success', `User ${userToRemove.name} has been removed successfully!`);
		}
		return filtered;
	});
};

const editUser = (id: number, updatedUser: Partial<{ name: string; email: string; role: Users['role']; status: Users['status'] }>) => {
	users.update((current) =>
		current.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
	);
};

const itemsPerPage = 10;
const currentPage = writable(1);

const filteredUsers = derived(
	[users, searchTerm, statusFilter, roleFilter],
	([$users, $searchTerm, $statusFilter, $roleFilter]) => {
		let filtered = $users;


		if ($searchTerm) {
			const lowerSearchTerm = $searchTerm.toLowerCase();
			filtered = filtered.filter(
				(user) =>
					user.name.toLowerCase().includes(lowerSearchTerm) ||
					user.email.toLowerCase().includes(lowerSearchTerm)
			);
		}

	
		if ($statusFilter !== 'All Status') {
			filtered = filtered.filter((user) => user.status === $statusFilter);
		}

		if ($roleFilter !== 'All Roles') {
			filtered = filtered.filter((user) => user.role === $roleFilter);
		}

		return filtered;
	}
);


const paginatedUsers = derived(
	[filteredUsers, currentPage],
	([$filteredUsers, $currentPage]) => {
		const start = ($currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return $filteredUsers.slice(start, end);
	}
);

// Derived store for total pages
const totalPages = derived(filteredUsers, ($filteredUsers) => {
	return Math.ceil($filteredUsers.length / itemsPerPage);
});

const hasNext = derived([currentPage, totalPages], ([$currentPage, $totalPages]) => {
	return $currentPage < $totalPages;
});

const hasPrevious = derived(currentPage, ($currentPage) => {
	return $currentPage > 1;
});

const nextPage = () => {
	currentPage.update((page) => {
		const total = get(totalPages);
		return page < total ? page + 1 : page;
	});
};

const previousPage = () => {
	currentPage.update((page) => (page > 1 ? page - 1 : page));
};

const setCurrentPage = (page: number) => {
	const total = get(totalPages);
	currentPage.set(Math.min(Math.max(page, 1), total));
};

searchTerm.subscribe(() => currentPage.set(1));
statusFilter.subscribe(() => currentPage.set(1));
roleFilter.subscribe(() => currentPage.set(1));

export {
	user,
	updateUser,
	users,
	addNewUser as add,
	removeUser as remove,
	editUser as edit,
	searchTerm,
	statusFilter,
	roleFilter,
	filteredUsers,
	paginatedUsers,
	currentPage,
	nextPage,
	previousPage,
	hasNext,
	hasPrevious,
	setCurrentPage,
	totalPages,
	toast,
	showToast,
	toastHandler
};