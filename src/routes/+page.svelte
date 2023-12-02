<script>
	import clsx from 'clsx';
	const days = Array.from({ length: 24 }, (_, i) => i + 1);
</script>

<ul class="grid grid-cols-3 md:grid-cols-6 gap-4">
	{#each days as day}
		{@const valid = day <= 24 && new Date().getDate() >= day}
		<li>
			<a
				class={clsx(
					valid && 'hover:shadow hover:border-gray-500 font-semibold text-3xl',
					!valid && 'opacity-50 text-2xl pointer-events-none select-none',
					'transition rounded aspect-square flex border border-gray-500/50 items-center justify-center'
				)}
				tabindex={valid ? 0 : -1}
				href={`./${day}`}
			>
				{day}
			</a>
		</li>
	{/each}
</ul>
