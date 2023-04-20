<script>
	import { Row, Col, Form, FormGroup, Label, Input, Table } from 'sveltestrap';
	export let data;
	let gpio = '';
	let description = '';
</script>

{data.sprinklers.length}
<Row>
	<Col>
		<Table striped>
			<thead>
				<tr>
					<th>gpio</th>
					<th>description</th>
				</tr>
			</thead>
			<tbody>
				{#each data.sprinklers as sprinkler}
					<tr>
						<td>{sprinkler.gpio}</td>
						<td>{sprinkler.description}</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	</Col>
</Row>
<Row>
	<Col>
		<Form method="post" action="?/newSprinkler">
			<Row>
				<Col xs={2}>
					<Input type="number" name="gpio" id="" placeholder="gpio" bind:value={gpio} />
				</Col>
				<Col xs={5}>
					<Input
						name="description"
						type="text"
						placeholder="description"
						id="exampleDesc"
						bind:value={description}
					/>
				</Col>
				<Col>
					<Input color="primary" disabled={gpio == '' ? true : false} type="submit" value="Add" />
				</Col>
			</Row>
		</Form>
	</Col>
</Row>
