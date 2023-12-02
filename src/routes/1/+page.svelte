<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	// Part 1
	let sum = 0;
	data.input?.split('\n').forEach((x: string) => {
		const numbers = x.match(/\d/g);
		const value = Number(
			(numbers?.[0] || '') + (numbers?.length ?? 0 > 1 ? numbers?.slice(-1) : '')
		);
		sum += value;
	});

	// Part 2
	let sum2 = 0;
	function getNum(_str?: string | string[]): string {
		if (!_str) return '';
		const str = Array.isArray(_str) ? _str?.join('') : _str;
		const toNum: Record<string, string> = {
			one: '1',
			two: '2',
			three: '3',
			four: '4',
			five: '5',
			six: '6',
			seven: '7',
			eight: '8',
			nine: '9'
		};
		return toNum[str] ?? str;
	}

	data.input?.split('\n').forEach((x: string) => {
		const numbers = Array.from(
			x.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g),
			(m) => m[1]
		);
		const value = Number(getNum(numbers?.[0]) + getNum(numbers?.[numbers.length - 1]));

		sum2 += value;
	});
</script>

Part 1: {sum}
<br />
Part 2: {sum2}
