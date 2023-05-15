import { fail } from '@sveltejs/kit';
import { connectToDB } from '$lib/db';
import type { PageServerLoad, Actions } from './$types';

export const load = (async (params) => {
	const dbConnection = await connectToDB();
	const zones = await dbConnection.query('SELECT * FROM zone');
	const sprinklers = await dbConnection.query('SELECT * FROM sprinkler');
	// console.log('sprinklers:', sprinklers.rows);
	dbConnection.release();
	return { sprinklers: sprinklers.rows, zones: zones.rows };
}) satisfies PageServerLoad;

export const actions: Actions = {
	newZone: async ({ request }) => {
		const theFormData = await request.formData();

		let zones: [number] = [];
		let zoneId;
		let description;
		theFormData.forEach((value, key) => {
			if (key == 'zone') zones.push(parseInt(value.toString()));
			if (key.includes('zone_id')) zoneId = parseInt(value.toString());
			if (key.includes('zone_description')) description = value.toString();
			// console.log(key, value);
		});

		// console.log(theFormData.get('gpio'), theFormData.get('description'));
		const dbConnection = await connectToDB();
		const newZone = await dbConnection.query(
			'INSERT INTO zone (zone_description, sprinkler_id, zone_id) VALUES ($1, $2, $3) RETURNING *',
			[description, JSON.stringify(zones), zoneId]
		);
		const sprinklers = await dbConnection.query('SELECT * FROM sprinkler');
		dbConnection.release();
		return { sprinklers: sprinklers.rows, zones: newZone.rows };
	}

	// newSprinkler: async ({ request }) => {
	// 	const theFormData = await request.formData();
	// 	console.log(theFormData.get('gpio'), theFormData.get('description'));
	// 	const dbConnection = await connectToDB();
	// 	const newSprinkler = await dbConnection.query(
	// 		'INSERT INTO sprinkler (gpio, description) VALUES ($1, $2) RETURNING *',
	// 		[theFormData.get('gpio'), theFormData.get('description')]
	// 	);
	// 	dbConnection.release();
	// 	return { sprinkler: newSprinkler.rows };
	// }
};
