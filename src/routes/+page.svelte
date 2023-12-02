<script>
	const days = Array.from({ length: 24 }, (_, i) => i + 1);
</script>

<ul class="grid grid-cols-3 md:grid-cols-6 gap-4">
	{#each days as day}
		<li>
			<a
				class="hover:shadow text-3xl font-semibold transition rounded aspect-square flex border border-gray-500/50 hover:border-gray-500 items-center justify-center"
				href={`./${day}`}
			>
				{day}
			</a>
		</li>
	{/each}
</ul>
