const fs = require('fs').promises;

async function connect(req, res) {
	try {
		const token = req.headers.authorization.replace('Bearer ', '');
		if (token === process.env.TOKEN) {
			console.log('oui');
			const config = JSON.parse(await fs.readFile('config.json', 'utf8'));

			return { code: 200, data: config };
		} else {
			return { code: 401, data: 'Unauthorized' };
		}
	} catch (error) {
		return { code: 500, data: 'Error reading config file' };
	}
}

module.exports = {
	connect,
};
