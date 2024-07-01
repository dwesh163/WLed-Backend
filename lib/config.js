function connect(req, res) {
	const token = req.headers.authorization.replace('Bearer ', '');
	if (token === process.env.TOKEN) {
		fs.readFile('config.json', 'utf8', (err, data) => {
			if (err) {
				return { code: 500, data: 'Error reading config file' };
			}
			const config = JSON.parse(data);
			return { code: 200, data: config };
		});
	} else {
		return { code: 401, data: 'Unauthorized' };
	}
}
