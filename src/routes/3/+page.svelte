<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	// Part 1
	let sum = 0;

	const lines = data.input?.trim().split('\n');
	let y = 0;
	while (y < lines.length) {
		const line = lines[y];

		let x = 0;
		let currNum = '';
		let currCounts = false;

		while (x < line.length) {
			if (isNaN(+line[x])) {
				if (currCounts) sum += +currNum;
				currNum = '';
			} else currNum += line[x];

			currCounts = !!currNum.length && (currCounts || counts(y, x));
			x++;
		}
		// If the last part of the line was a number
		if (currCounts) sum += +currNum;

		y++;
	}

	function counts(y: number, x: number) {
		const prevLine = lines[y - 1] ?? '';
		const currline = lines[y];
		const nextLine = lines[y + 1] ?? '';

		const regex = /[^.]/;
		const regex2 = /[^0-9.]/;

		return (
			regex.test(prevLine[x - 1] ?? '.') ||
			regex.test(prevLine[x] ?? '.') ||
			regex.test(prevLine[x + 1] ?? '.') ||
			regex2.test(currline[x - 1] ?? '.') ||
			regex2.test(currline[x + 1] ?? '.') ||
			regex.test(nextLine[x - 1] ?? '.') ||
			regex.test(nextLine[x] ?? '.') ||
			regex.test(nextLine[x + 1] ?? '.')
		);
	}

	// Part 2
	const stars: Record<string, number[]> = {};

	let y2 = 0;
	while (y2 < lines.length) {
		const line = lines[y2];

		let x = 0;
		let currNum = '';
		let adjStars: Set<string> = new Set();

		while (x < line.length) {
			if (isNaN(+line[x])) {
				if (+currNum)
					adjStars.forEach((star) => {
						if (stars[star]) stars[star].push(+currNum);
						else stars[star] = [+currNum];
					});
				adjStars = new Set();
				currNum = '';
			} else {
				currNum += line[x];
				if (currNum) {
					addStars(adjStars, y2, x);
				}
			}

			x++;
		}
		if (+currNum)
			adjStars.forEach((star) => {
				if (stars[star]) stars[star].push(+currNum);
				else stars[star] = [+currNum];
			});

		y2++;
	}

	let sum2 = Object.values(stars).reduce(
		(acc, arr) => (arr?.length === 2 ? arr[0] * arr[1] + acc : acc),
		0
	);

	function addStars(stars: Set<string>, y: number, x: number) {
		const prevLine = lines[y - 1] ?? '';
		const currline = lines[y];
		const nextLine = lines[y + 1] ?? '';

		for (let i = x - 1; i <= x + 1; i++) {
			if (prevLine[i] === '*') {
				console.log(`${i},${y - 1}`);
				stars.add(`${i},${y - 1}`);
			}
			if (currline[i] === '*') stars.add(`${i},${y}`);
			if (nextLine[i] === '*') stars.add(`${i},${y + 1}`);
		}
	}
</script>

Part 1: {sum}
<br />
Part 2: {sum2}
<br />

{#each lines as line}
	{line}
	<br />
{/each}
