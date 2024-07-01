const express = require('express');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const state = require('./lib/state');
const config = require('./lib/config');
const effects = require('./lib/effects');

const app = express();
const port1 = 3000;
const port2 = 3001;

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
	res.status(200).send('Server is running');
});

app.post('/state', async (req, res) => {
	const response = await state.editState(req);
	res.status(response.code).send(response.data);
});

app.get('/state', async (req, res) => {
	const response = await state.getState(req);
	res.status(response.code).send(response.data);
});

app.get('/effects', async (req, res) => {
	const response = await effects.getEffects(req);
	res.status(response.code).send(response.data);
});

app.post('/effects', async (req, res) => {
	const response = await effects.setEffects(req);
	res.status(response.code).send(response.data);
});

app.post('/connect', async (req, res) => {
	const response = await config.connect(req);
	res.status(response.code).send(response.data);
});

const startServer = (port) => {
	app.listen(port, () => {
		console.log(`Server listening on port ${port}`);
	});
};

startServer(port1);
startServer(port2);
