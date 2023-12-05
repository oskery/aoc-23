<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	// Part 1
	let sum = 0;

	const lines = data.input?.trim().split('\n');

	lines.forEach((line: string, i: number) => {
		let winners = new Set();

		const [left, right] = line.split(': ')?.[1].split(' | ');
		const winning = left
			.trim()
			.split(' ')
			.map(Number)
			.filter((x) => !!x);
		const numbers = right?.trim().split(' ').map(Number);

		winning.forEach((num: number) => (numbers?.includes(num) ? winners.add(num) : null));

		if (Array.from(winners).length) sum += Math.pow(2, Array.from(winners).length - 1);
	});

	// Part 2
	let cards: Record<number, number[]> = {}; // for part 2

	lines.reverse().forEach((line: string, i: number) => {
		const card = lines.length - i;
		let winners = new Set();

		const [left, right] = line.split(': ')?.[1].split(' | ');
		const winning = left
			.trim()
			.split(' ')
			.map(Number)
			.filter((x) => !!x);
		const numbers = right?.trim().split(' ').map(Number);

		winning.forEach((num: number) => (numbers?.includes(num) ? winners.add(num) : null));

		if (Array.from(winners).length) {
			cards[card] = Array.from(winners).map((_, i) => card + 1 + i);

			cards[card] = cards[card].concat(
				cards[card].map((c) => (c !== card ? cards[c] ?? [] : [])).flat()
			);
		}
	});
	let sum2 =
		Object.keys(lines).length + Object.values(cards).reduce((acc, arr) => acc + arr.length, 0);
</script>

Part 1: {sum}

<br />
Part 2: {sum2}
<br />
