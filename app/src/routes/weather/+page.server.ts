import { fail } from '@sveltejs/kit';
import { connectToDB } from '$lib/db';
import type { PageServerLoad, Actions } from './$types';

export const load = (async (params) => {
	const theWeather = await fetch('https://api.weather.gov/gridpoints/SLC/98,168/forecast/hourly');
	const theWeatherJSON = await theWeather.json();
	// console.log('theWeatherJSON:', theWeatherJSON);
	return { weather: theWeatherJSON.properties.periods };
}) satisfies PageServerLoad;

// export const actions: Actions = {
// 	newSprinkler: async ({ request }) => {
// 		const theFormData = await request.formData();
// 		console.log(theFormData.get('gpio'), theFormData.get('description'));
// 		const dbConnection = await connectToDB();
// 		const newSprinkler = await dbConnection.query(
// 			'INSERT INTO sprinkler (gpio, description) VALUES ($1, $2) RETURNING *',
// 			[theFormData.get('gpio'), theFormData.get('description')]
// 		);
// 		dbConnection.release();
// 		return { sprinkler: newSprinkler.rows };
// 	}
// };
