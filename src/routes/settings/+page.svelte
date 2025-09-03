<script lang="ts">
	import { user, updateUser, toastHandler } from '../../stores/useStore';
	
	let siteName = $state($user.siteName);
	let email = $state($user.email);
	let timezone = $state($user.timezone);
	let enableEmail = $state($user.notifications.email);
	let enablePush = $state($user.notifications.push);
	let enableSms = $state($user.notifications.sms);

	const toggleNotification = (type: string) => {
		if (type === 'email') {
			enableEmail = !enableEmail;
		} else if (type === 'push') {
			enablePush = !enablePush;
		} else if (type === 'sms') {
			enableSms = !enableSms;
		}
	};

	const saveSettings = () => {
		updateUser({
			siteName,
			email,
			timezone,
			notifications: {
				email: enableEmail,
				push: enablePush,
				sms: enableSms
			}
		});
		toastHandler('success', 'Settings saved successfully!');
	};
</script>

<div class="p-6">
	<div class="mb-6">
		<h2 class="text-2xl font-bold text-gray-900">Settings</h2>
		<p class="text-gray-600">Configure your application preferences.</p>
	</div>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-gray-900">General Settings</h3>
			<div class="space-y-4">
				<div>
					<label class="mb-1 block text-sm font-medium text-gray-700" for="site-name">
						Site Name
					</label>
					<input
						id="site-name"
						type="text"
						bind:value={siteName}
						class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
				</div>
				<div>
					<label class="mb-1 block text-sm font-medium text-gray-700" for="email">Email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
				</div>
				<div>
					<label class="mb-1 block text-sm font-medium text-gray-700" for="timezone">
						Timezone
					</label>
					<select
						id="timezone"
						bind:value={timezone}
						class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					>
						<option value="UTC">UTC</option>
						<option value="EST">EST</option>
						<option value="PST">PST</option>
					</select>
				</div>
			</div>
		</div>

		<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-gray-900">Notification Settings</h3>
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<span class="text-sm font-medium text-gray-700">Email Notifications</span>
					<button
						type="button"
						onclick={() => toggleNotification('email')}
						class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 {enableEmail ? 'bg-blue-600' : 'bg-gray-300'}"
						role="switch"
						aria-checked={enableEmail}
						aria-label="Toggle email notifications"
					>
						<span
							class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {enableEmail ? 'translate-x-6' : 'translate-x-1'}"
						></span>
					</button>
				</div>

				<div class="flex items-center justify-between">
					<span class="text-sm font-medium text-gray-700">Push Notifications</span>
					<button
						type="button"
						onclick={() => toggleNotification('push')}
						class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 {enablePush ? 'bg-blue-600' : 'bg-gray-300'}"
						role="switch"
						aria-checked={enablePush}
						aria-label="Toggle push notifications"
					>
						<span
							class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {enablePush ? 'translate-x-6' : 'translate-x-1'}"
						></span>
					</button>
				</div>

				<div class="flex items-center justify-between">
					<span class="text-sm font-medium text-gray-700">SMS Notifications</span>
					<button
						type="button"
						onclick={() => toggleNotification('sms')}
						class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 {enableSms ? 'bg-blue-600' : 'bg-gray-300'}"
						role="switch"
						aria-checked={enableSms}
						aria-label="Toggle SMS notifications"
					>
						<span
							class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {enableSms ? 'translate-x-6' : 'translate-x-1'}"
						></span>
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 flex justify-end">
		<button 
			type="button"
			onclick={saveSettings} 
			class="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		>
			Save Changes
		</button>
	</div>
</div>