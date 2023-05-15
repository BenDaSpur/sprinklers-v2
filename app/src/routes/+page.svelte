<script>
	import { onMount } from 'svelte';
	import moment from 'moment-timezone';
	import Chart from 'svelte-frappe-charts';
	import { Col, Row } from 'sveltestrap';

	// onMount(async () => {
	// 	const response = await fetch('/dashboard');
	// 	const data = await response.json();
	// 	console.log(data);
	// });

	let highLowChartData;
	let precipData;

	const getData = async () => {
		const response = await fetch('/dashboard');
		const data = await response.json();
		console.log(data.highLows.map((period) => period));
		const chartData = {
			labels: data.highLows.map((period) => moment(period.date).utc().format('L')),
			datasets: [
				{
					name: 'High',
					values: data.highLows.map((period) => period.max),
					chartType: 'line'
				},
				{
					name: 'Low',
					values: data.highLows.map((period) => period.min),
					chartType: 'line'
				}
			]
		};

		precipData = {
			labels: data.highLows.map((period) => moment(period.date).utc().format('L')),
			datasets: [
				{
					name: 'Precipitation',
					values: data.highLows.map((period) => period.precip_chance),
					chartType: 'bar'
				}
			],
			yRegions: [
				{
					label: 'Precip Chance',
					start: 0,
					end: 100
				}
			]
		};
		highLowChartData = chartData;
	};
</script>

<svelte:head>
	<title>Sprinklers App</title>
	<meta name="description" content="Sprinklers App" />
</svelte:head>
<Row>
	<Col>
		<h3>Sprinkler Dashboard</h3>

		{#await getData() then value}
			<!-- {JSON.stringify(value.weather)} -->
			<Chart data={highLowChartData} type="line" colors={['red', 'blue', 'green']} />
			<Chart data={precipData} type="bar" />
			<!-- promise was fulfilled -->
		{/await}
	</Col>
</Row>

<style>
</style>
