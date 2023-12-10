<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	// data.input = `seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15\n\nfertilizer-to-water map:\n49 53 8\n0 11 42\n42 0 7\n57 7 4\n\nwater-to-light map:\n88 18 7\n18 25 70\n\nlight-to-temperature map:\n45 77 23\n81 45 19\n68 64 13\n\ntemperature-to-humidity map:\n0 69 1\n1 0 69\n\nhumidity-to-location map:\n60 56 37\n56 93 4`;

	// Part 1
	const [fst, ...rest] = data.input?.trim().split('\n');
	let initialSeeds = fst.split(': ')[1].split(' ').map(Number);
	let seeds = [...initialSeeds];

	const seeds2: number[] = [];
	console.log(data.input);
	initialSeeds.forEach((seed: number, i: number) => {
		if (i % 2 !== 0) return;
		let j = initialSeeds[i + 1];
		// while (j-- > 0) {
		// 	seeds2.push(j);
		// }
	});

	// Given array of seeds, e.g: 79 14 55 13. Create an array of numbers from 79-92 and 55-68

	// Use Object.groupBy if not sveltekit
	const groups = rest.reduce((acc, line) => {
		if (line === '') acc.push([]);
		else acc[acc.length - 1].push(line);
		return acc;
	}, []);

	const callbacks = groups.map((group) => {
		const [_, ...pipes] = group;

		return (seed: number) => {
			let res = seed;
			pipes?.forEach((pipe) => {
				const [dest, src, range] = pipe.split(' ').map(Number);
				if (seed >= src && seed < src + range) res = seed - src + dest;
			});
			return res;
		};
	});

	callbacks.forEach((cb) => {
		seeds.forEach((seed: number, i: number) => (seeds[i] = cb(seed)));
		// seeds2.forEach((seed: number, i: number) => (seeds2[i] = cb(seed)));
	});
</script>

Part 1: {Math.min(...seeds)}

<br />
Part 2: {Math.min(...seeds2)}
<br />
