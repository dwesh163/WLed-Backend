const fs = require('fs').promises;

async function editState(req) {
	try {
		const post = JSON.stringify({ ...req.body, v: true });
		const config = JSON.parse(await fs.readFile('config.json', 'utf8'));
		const response = await fetch(config.wled + '/json/state', {
			method: 'POST',
			body: post,
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			const data = await response.json();
			return { code: 200, data: data };
		} else {
			return { code: 500, data: 'Error updating state' };
		}
	} catch (error) {
		console.error('Error in editState:', error);
		return { code: 500, data: 'Server Error' };
	}
}

async function getState(req) {
	try {
		const config = JSON.parse(await fs.readFile('config.json', 'utf8'));
		const response = await fetch(config.wled + '/json/state');
		const data = await response.json();
		return { code: 200, data: data };
	} catch (error) {
		console.error('Error in getState:', error);
		return { code: 500, data: 'Server Error' };
	}
}

module.exports = {
	editState,
	getState,
};
