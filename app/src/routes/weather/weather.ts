import * as dotenv from 'dotenv';
import moment from 'moment-timezone';
import pg from 'pg';
// import { PoolConfig } from 'pg';

// const Pool = pg.Pool;

export interface Weather {
	number: number;
	name: string;
	startTime: Date;
	endTime: Date;
	isDaytime: boolean;
	temperature: number;
	temperatureUnit: string;
	temperatureTrend: null;
	probabilityOfPrecipitation: Dewpoint;
	dewpoint: Dewpoint;
	relativeHumidity: Dewpoint;
	windSpeed: string;
	windDirection: string;
	icon: string;
	shortForecast: string;
	detailedForecast: string;
}

export interface Dewpoint {
	unitCode: string;
	value: number;
}

dotenv.config();

const pool = new pg.Pool({
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	host: 'db',
	password: process.env.POSTGRES_PASSWORD,
	port: 5432
});

export const connectToDB = async () => await pool.connect();

const getWeather = async () => {
	console.log(process.env.WEATHER_URL);

	if (!process.env.WEATHER_URL) return;
	const weather = await fetch(process.env.WEATHER_URL);
	const weatherData = await weather.json();

	weatherData.properties.periods.forEach(async (period: Weather) => {
		const dbConnection = await connectToDB();
		const weather = await dbConnection.query('SELECT * FROM weather where datetime = $1', [
			moment(period.startTime).tz('America/Denver').format('YYYY-MM-DD HH:mm:ss')
		]);
		if (weather.rows.length === 0) {
			const newWeather = await dbConnection.query(
				'INSERT INTO weather (datetime, temperature, description, precip_chance, humidity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
				[
					moment(period.startTime).tz('America/Denver').format('YYYY-MM-DD HH:mm:ss'),
					period.temperature,
					period.shortForecast,
					period.probabilityOfPrecipitation.value,
					period.relativeHumidity.value
				]
			);
			console.log('newWeather');
		} else {
			const updateWeather = await dbConnection.query(
				'UPDATE weather SET temperature = $1, description = $2, precip_chance = $3, humidity = $4 WHERE datetime = $5 RETURNING *',
				[
					period.temperature,
					period.shortForecast,
					period.probabilityOfPrecipitation.value,
					period.relativeHumidity.value,
					moment(period.startTime).tz('America/Denver').format('YYYY-MM-DD HH:mm:ss')
				]
			);
			console.log('updated weather');
		}
		// const sprinklers = await dbConnection.query('SELECT * FROM sprinkler');
		// console.log('sprinklers:', sprinklers.rows);
		dbConnection.release();
		// return { sprinklers: sprinklers.rows, schedules: schedules.rows };
	});
};

getWeather();
