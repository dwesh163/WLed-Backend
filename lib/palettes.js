const fs = require('fs').promises;

async function getPalettes() {
	try {
		const config = JSON.parse(await fs.readFile('config.json', 'utf8'));
		const response = await fetch(config.wled + '/json/pal');
		const data = await response.json();
		const formatData = data.map((palette, index) => {
			return { name: palette, id: index };
		});
		return { code: 200, data: formatData };
	} catch (error) {
		console.error('Error in getEffects:', error);
		return { code: 500, data: 'Server Error' };
	}
}

module.exports = {
	getPalettes,
};
