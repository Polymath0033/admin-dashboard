<script lang="ts">
	let { modal, title, toggleModal, children } = $props();
</script>

{#if modal}
	
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-4">
	
		<div class="w-full max-w-md transform rounded-lg bg-white shadow-xl relative transition-all z-50">

			<div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
				<h3 id="modal-title" class="text-lg font-semibold text-gray-900">{title}</h3>
				<button
					type="button"
					onclick={toggleModal}
					class="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
					>{'Close'}
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			{@render children?.()}
		</div>
	</div>
{/if}
