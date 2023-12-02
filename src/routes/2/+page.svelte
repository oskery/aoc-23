<script lang="ts">
	import { split } from 'postcss/lib/list';

	/** @type {import('./$types').PageData} */
	export let data;

	// Part 1
	const max = { red: 12, green: 13, blue: 14 };
	let sum = 0;

	data.input?.split('\n').forEach((x: string) => {
		if (!x) return;
		let [game, games] = x.split(': ');
		const id = Number(game.split(' ')[1]);

		const isFine = games
			.split('; ')
			.map((g) => g.split(', '))
			.flat()
			.reduce((acc, x) => {
				const [nr, color] = x.split(' ');
				return acc && Number(nr) <= max[color as keyof typeof max];
			}, true);

		sum += isFine ? id : 0;
	});

	// Part 2
	let sum2 = 0;

	data.input?.split('\n').forEach((x: string) => {
		if (!x) return;
		const max = { red: 0, green: 0, blue: 0 };

		let [_, games] = x.split(': ');

		games
			.split('; ')
			.map((g) => g.split(', '))
			.flat()
			.forEach((x) => {
				const [nr, color] = x.split(' ');
				const key = color as keyof typeof max;
				max[key] = Math.max(Number(nr), max[key]);
			});

		sum2 += max.red * max.green * max.blue;
	});
</script>

Part 1: {sum}
<br />
Part 2: {sum2}
