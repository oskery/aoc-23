<script>
	import '../app.css';
	import { page } from '$app/stores';

	$: day = Number($page.route?.id?.replace(/\D/g, ''));
</script>

<header>
	<a href="./" class="text-2xl font-bold">
		<h1>Advent of Code 2023</h1>
	</a>
</header>

<header class="py-2">
	{#if day}
		<h2>
			Day {day}
		</h2>
	{/if}
</header>

<main>
	<slot />
</main>
