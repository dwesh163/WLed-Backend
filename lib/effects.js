const fs = require('fs').promises;

async function getInfo(data) {
	let effects = [];
	const config = JSON.parse(await fs.readFile('config.json', 'utf8'));
	const response = await fetch(config.wled + '/json/fxdata');
	const info = await response.json();

	for (let i = 0; i < data.length; i++) {
		effects.push({ name: data[i], info: info[i], id: i });
	}

	return effects;
}

async function setEffects(req) {
	try {
		console.log(req.body.on);
		const post = JSON.stringify({ on: req.body.on, v: true });
		const config = JSON.parse(await fs.readFile('config.json', 'utf8'));
		const response = await fetch(config.wled + '/json/state', {
			method: 'POST',
			body: post,
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			const data = await response.json();
			const allData = await getInfo(data);
			return { code: 200, data: allData };
		} else {
			return { code: 500, data: 'Error updating state' };
		}
	} catch (error) {
		console.error('Error in setEffects:', error);
		return { code: 500, data: 'Server Error' };
	}
}

async function getEffects(req) {
	try {
		const config = JSON.parse(await fs.readFile('config.json', 'utf8'));
		const response = await fetch(config.wled + '/json/eff');
		const data = await response.json();
		const allData = await getInfo(data);
		return { code: 200, data: allData };
	} catch (error) {
		console.error('Error in getEffects:', error);
		return { code: 500, data: 'Server Error' };
	}
}

module.exports = {
	setEffects,
	getEffects,
};
