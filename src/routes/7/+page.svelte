<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	// data.input = `32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483`;

	// Part 1
	const sorted = data.input
		?.trim()
		.split('\n')
		.toSorted((a: string, b: string) => compare(a.split(' ')[0], b.split(' ')[0]));

	function compare(cardsA: string, cardsB: string) {
		const sc = score(cardsA) - score(cardsB);
		if (sc !== 0) return sc;

		const point = {
			T: 10,
			J: 11,
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

	function score(cards: string) {
		const cs = cards.split('');
		let unique = new Set(cs);

		// Five of a kind
		if (unique.size === 1) return 100;
		if (unique.size === 2) {
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
			)
				return 70;
			// Two pair
			return 60;
		}
		if (unique.size === 4) {
			// One pair
			return 50;
		}
		// High card
		return 40;
	}

	const sum = sorted.reduce(
		(acc: number, x: string, i: number) => acc + +x.split(' ')[1] * (i + 1),
		0 as number
	);
</script>

Part 1: {sum}

<br />
Part 2:
