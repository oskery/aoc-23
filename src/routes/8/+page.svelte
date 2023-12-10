<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	const [instructions, ...coords] = data.input?.trim().split('\n');

	let current = '';

	const map = coords.reduce((acc, x, i) => {
		const [key, y] = x.split(' = ');
		if (!current) current = key;
		const [L, R] = y.replaceAll('(', '').replaceAll(')', '').split(', ');
		return {
			...acc,
			[key]: {
				L,
				R
			}
		};
	});

	let steps = 0;
	let stack = instructions.split('').reverse();

	while (current !== 'ZZZ') {
		if (stack.length === 0) stack = instructions.split('').reverse();

		if (steps > 99999) break;
		const dir = stack.pop();

		current = map[current][dir];
		steps++;
	}
</script>

{current}
{steps}
<!-- Part 1: {sum} -->
<br />
