<script lang="ts">
	const metrics = [
		{ title: 'Total Users', value: '2,847', change: '+12%', icon: '👥' },
		{ title: 'Revenue', value: '$84,532', change: '+8.2%', icon: '💰' },
		{ title: 'Orders', value: '1,423', change: '+23%', icon: '📦' },
		{ title: 'Conversion Rate', value: '3.24%', change: '+0.8%', icon: '📈' }
	];
</script>

<div class="p-6">
	<div class="mb-6">
		<h2 class="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
		<p class="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
	</div>

	<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		{#each metrics as metric}
			<div
				class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600">{metric.title}</p>
						<p class="mt-1 text-2xl font-bold text-gray-900">{metric.value}</p>
					</div>
					<div class="text-2xl">{metric.icon}</div>
				</div>
				<div class="mt-2">
					<span class="text-sm font-medium text-green-600">{metric.change}</span>
					<span class="ml-1 text-sm text-gray-500">from last month</span>
				</div>
			</div>
		{/each}
	</div>
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
			<h3 class="mb-4 text-lg font-semibold text-gray-900">Revenue Chart</h3>
			<div
				class="flex h-64 items-center justify-center rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50"
			>
				<div class="text-center">
					<div class="mb-2 text-4xl text-blue-500">📈</div>
					<p class="text-gray-600">Chart visualization would go here</p>
					<p class="text-sm text-gray-500">Integrate with Chart.js or D3.js</p>
				</div>
			</div>
		</div>

		<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h3>
			<div class="space-y-4">
				<div class="flex items-start space-x-3">
					<div class="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
					<div>
						<p class="text-sm font-medium text-gray-900">New user registered</p>
						<p class="text-xs text-gray-500">2 minutes ago</p>
					</div>
				</div>
				<div class="flex items-start space-x-3">
					<div class="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
					<div>
						<p class="text-sm font-medium text-gray-900">Order completed</p>
						<p class="text-xs text-gray-500">5 minutes ago</p>
					</div>
				</div>
				<div class="flex items-start space-x-3">
					<div class="mt-2 h-2 w-2 rounded-full bg-yellow-500"></div>
					<div>
						<p class="text-sm font-medium text-gray-900">Payment pending</p>
						<p class="text-xs text-gray-500">10 minutes ago</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
