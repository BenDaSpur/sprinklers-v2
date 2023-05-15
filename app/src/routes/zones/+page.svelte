<script>
	import { Row, Col, Button, Input, Label, Form, Icon } from 'sveltestrap';
	export let data;
	// console.log(data);
</script>

<Row>
	<Col>
		<h3>Zones</h3>
	</Col>
</Row>

<Row>
	<Col md={2}>
		<h4>ID</h4>
	</Col>
	<Col md={3}>
		<h4>GPIO</h4>
	</Col>
	<Col md={4}>
		<h4>Description</h4>
	</Col>
	<Col md={2}>
		<h4>Actions</h4>
		<!-- <Button color="primary" href={`?/editZone/${zone.zone_id}`}>Edit</Button> -->
	</Col>
</Row>

{#each data.zones as zone}
	<!-- content here -->
	<Row class="my-1">
		<Col md={2}>
			{zone.zone_id}
		</Col>
		<Col md={3}>
			{zone.sprinkler_id}
		</Col>
		<Col md={4}>
			{zone.zone_description}
		</Col>
		<Col md={2}>
			<!-- <Button color="primary" href={`?/editZone/${zone.zone_id}`}>Edit</Button> -->
			<Form method="post" action={`?/deleteZone/${zone.zone_id}`}>
				<Button size="sm" color="danger" name="id" value={zone.id}>
					<Icon name="trash" />
				</Button>
			</Form>
			<!-- <Button color="danger" href={`?/deleteZone/${zone.zone_id}`}>Delete {zone.zone_id}</Button> -->
		</Col>
	</Row>
{/each}

<hr />

<Row>
	<Col>
		<Form method="post" action="?/newZone">
			<Row>
				<Col md={2}>
					<Input type="number" placeholder="id" name="zone_id" />
				</Col>
				<Col md={3}>
					<!-- <Input
						name="description"
						type="text"
						placeholder="description"
						id="exampleDesc"
						bind:value={description}
					/> -->

					{#each data.sprinklers as zone}
						<Input
							id={`zone-${zone.gpio}`}
							value={zone.gpio}
							type="checkbox"
							name="zone"
							label={`${zone.id} - ${zone.description}`}
							bind:checked={zone.checked}
						/>
					{/each}
				</Col>
				<Col md={4}>
					<Input type="text" placeholder="description" name="zone_description" />
				</Col>
				<Col md={2}>
					<Input color="primary" type="submit" value="Save" />
				</Col>
			</Row>
		</Form>
	</Col>
</Row>
