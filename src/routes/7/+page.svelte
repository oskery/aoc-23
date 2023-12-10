<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	// data.input = `32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483`;

	// Part 1
	const sorted1 = data.input
		?.trim()
		.split('\n')
		.toSorted((a: string, b: string) => compare(a.split(' ')[0], b.split(' ')[0]));

	function compare(cardsA: string, cardsB: string, isPart2 = false) {
		const sc = score(cardsA, isPart2) - score(cardsB, isPart2);
		if (sc !== 0) return sc;

		const point = {
			T: 10,
			J: isPart2 ? 1 : 11,
			Q: 12,
			K: 13,
			A: 14
		};

		for (let i = 0; i < cardsA.length; i++) {
			const c1 = cardsA[i];
			const c2 = cardsB[i];
			const c1p = point[c1 as keyof typeof point] || Number(c1);
			const c2p = point[c2 as keyof typeof point] || Number(c2);
			if (c1p === c2p) continue;
			return c1p < c2p ? -1 : 1;
		}
	}

	function score(cards: string, isPart2: boolean) {
		const cs = cards.split('');
		let unique = new Set(cs);
		let nrJokers = isPart2 ? cs.filter((c) => c === 'J').length : 0;

		// Five of a kind
		if (unique.size === 1) return 100;
		if (unique.size === 2) {
			// If there are any jokers, it's a five of a kind
			if (nrJokers > 0) return 100;
			// Four of a kind
			if (cs.filter((c) => c === cs[0]).length === 4 || cs.filter((c) => c === cs[1]).length === 4)
				return 90;
			// Full house
			return 80;
		}
		if (unique.size === 3) {
			// Three of a kind
			if (
				cs.filter((c) => c === cs[0]).length === 3 ||
				cs.filter((c) => c === cs[1]).length === 3 ||
				cs.filter((c) => c === cs[2]).length === 3
			) {
				// We cant have two jokers, but if we have one, it's a four of a kind
				if (nrJokers === 1) return 90;
				return 70;
			}
			// Two pair
			if (nrJokers === 1) return 80;
			else if (nrJokers === 2) return 90;
			return 60;
		}
		if (unique.size === 4) {
			// One pair
			if (nrJokers === 1) return 70;
			return 50;
		}
		// High card
		if (nrJokers === 1) return 50;
		return 40;
	}

	const sum = sorted1.reduce(
		(acc: number, x: string, i: number) => acc + +x.split(' ')[1] * (i + 1),
		0 as number
	);

	// Part 2
	const sorted2 = data.input
		?.trim()
		.split('\n')
		.toSorted((a: string, b: string) => compare(a.split(' ')[0], b.split(' ')[0], true));

	const sum2 = sorted2.reduce(
		(acc: number, x: string, i: number) => acc + +x.split(' ')[1] * (i + 1),
		0 as number
	);
</script>

Part 1: {sum}
<br />
Part 2: {sum2}
