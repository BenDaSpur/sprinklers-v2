<script>
	import { Row, Col, Form, FormGroup, Label, Input, Table, Button, Icon } from 'sveltestrap';
	import { goto } from '$app/navigation';

	export let data;
	let monday = false;
	let tuesday = false;
	let wednesday = false;
	let thursday = false;
	let friday = false;
	let saturday = false;
	let sunday = false;

	let days = [];
	let zones = [];

	console.log(data.schedules);
</script>

<svelte:head>
	<title>Schedules</title>
	<meta name="description" content="Schedules for spinklers" />
</svelte:head>

<Row>
	<Col>
		<h3>Schedules</h3>
	</Col>
</Row>
<Table striped hover>
	<thead>
		<tr>
			<th>Days</th>
			<th>Zones</th>
			<th>Start Time</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each data.schedules as schedule, i}
			<tr>
				<td>
					{#each schedule.days as day}
						{#if day == 1}
							<span> Mon </span>
						{:else if day == 2}
							<span> Tue </span>
						{:else if day == 3}
							<span> Wed </span>
						{:else if day == 4}
							<span> Thu </span>
						{:else if day == 5}
							<span> Fri </span>
						{:else if day == 6}
							<span> Sat </span>
						{:else if day == 7}
							<span> Sun </span>
						{/if}
					{/each}
				</td>
				<td>
					{#each schedule.zones as zone}
						<div>{zone.zone} for {zone.time} minutes</div>
					{/each}
				</td>
				<td>{schedule.start_time}</td>
				<td>
					<Form method="post" action="?/deleteSchedule">
						<Button size="sm" color="danger" name="id" value={schedule.id}>
							<Icon name="trash" />
						</Button>
					</Form>
				</td>
			</tr>
		{/each}
	</tbody>
</Table>

<hr />
<Row>
	<Col>
		<h5>Add New</h5>
		<Form method="post" action="?/newSchedule">
			<Row>
				<Col md={3}>
					<!-- <Input type="number" name="gpio" id="" placeholder="gpio" bind:value={gpio} /> -->

					<Input id="mon" name="day" value={1} type="checkbox" label="Mon" bind:checked={monday} />
					<Input id="tue" name="day" value={2} type="checkbox" label="Tue" bind:checked={tuesday} />
					<Input
						id="wed"
						name="day"
						value={3}
						type="checkbox"
						label="Wed"
						bind:checked={wednesday}
					/>
					<Input
						id="thu"
						name="day"
						value={4}
						type="checkbox"
						label="Thu"
						bind:checked={thursday}
					/>
					<Input id="fri" name="day" value={5} type="checkbox" label="Fri" bind:checked={friday} />
					<Input
						id="sat"
						name="sat"
						value={6}
						type="checkbox"
						label="Sat"
						bind:checked={saturday}
					/>
					<Input id="sun" name="day" value={7} type="checkbox" label="Sun" bind:checked={sunday} />
				</Col>
				<Col md={4}>
					<!-- <Input
						name="description"
						type="text"
						placeholder="description"
						id="exampleDesc"
						bind:value={description}
					/> -->

					{#each data.sprinklers as zone}
						<Input
							id={`zone-${zone.zone_id}`}
							value={zone.zone_id}
							type="checkbox"
							label={`${zone.zone_id} - ${zone.zone_description}`}
							bind:checked={zone.checked}
						/>
						{#if zone.checked}
							<!-- content here -->
							<Input placeholder="minutes" name={`zone-${zone.zone_id}`} />
						{/if}
					{/each}
				</Col>
				<Col md={3}>
					<Input type="time" name="startTime" id="" placeholder="Start Time" />
				</Col>
				<Col md={2}>
					<Input color="primary" type="submit" value="Save" />
				</Col>
			</Row>
		</Form>
	</Col>
</Row>
