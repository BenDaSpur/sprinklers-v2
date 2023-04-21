<script>
	import { Row, Col, Form, FormGroup, Label, Input, Table } from 'sveltestrap';
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
</script>

<Row>
	<Col>
		<h3>Schedules</h3>
	</Col>
</Row>

<Row>
	<Col>
		<Form method="post" action="?/newSchedule">
			<Row>
				<Col md={3}>
					<!-- <Input type="number" name="gpio" id="" placeholder="gpio" bind:value={gpio} /> -->
					<h5>Days</h5>
					<Input id="mon" name="mon" value={1} type="checkbox" label="Mon" bind:checked={monday} />
					<Input id="tue" name="tue" value={2} type="checkbox" label="Tue" bind:checked={tuesday} />
					<Input
						id="wed"
						name="wed"
						value={3}
						type="checkbox"
						label="Wed"
						bind:checked={wednesday}
					/>
					<Input
						id="thu"
						name="thu"
						value={4}
						type="checkbox"
						label="Thu"
						bind:checked={thursday}
					/>
					<Input id="fri" name="fri" value={5} type="checkbox" label="Fri" bind:checked={friday} />
					<Input
						id="sat"
						name="sat"
						value={6}
						type="checkbox"
						label="Sat"
						bind:checked={saturday}
					/>
					<Input id="sun" name="sun" value={7} type="checkbox" label="Sun" bind:checked={sunday} />
				</Col>
				<Col md={4}>
					<!-- <Input
						name="description"
						type="text"
						placeholder="description"
						id="exampleDesc"
						bind:value={description}
					/> -->
					<h5>Zones</h5>
					{#each data.sprinklers as zone}
						<Input
							id={`zone-${zone.gpio}`}
							value={zone.gpio}
							type="checkbox"
							label={`${zone.id} - ${zone.description}`}
						/>
					{/each}
				</Col>
				<Col md={3}>
					<h5>Start Time</h5>
					<Input type="time" name="startTime" id="" placeholder="Start Time" />
				</Col>
				<Col md={2}>
					<Input color="primary" type="submit" value="Add" />
				</Col>
			</Row>
		</Form>
	</Col>
</Row>
