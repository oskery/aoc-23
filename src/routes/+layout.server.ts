import { SESSION_TOKEN } from '$env/static/private';
// https://adventofcode.com/2022/day/1/input

/** @type {import('./$types').PageServerLoad} */
export async function load({ ...rest }) {
	// The day is provided in the path. its under rest.route.id, like so: "/1". We parse it

	// We also want to remove if any characters, e.g. 2b, 2c, etc
	const day = Number(rest.route?.id?.replace(/\D/g, ''));

	if (day)
		try {
			const res = await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
				headers: {
					cookie: `session=${SESSION_TOKEN}`
				}
			});
			return {
				input: await res.text()
			};
		} catch (e) {
			console.log('error', e);
		}
}
