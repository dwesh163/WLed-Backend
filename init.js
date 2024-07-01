const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const filePath = './config.json';

if (fs.existsSync(filePath)) {
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const jsonData = JSON.parse(fileContent);

	if (jsonData.name && jsonData.description && jsonData.id) {
		console.log('File already exists and contains the required fields.');
	} else {
		jsonData.name = 'Default Name';
		jsonData.description = 'Default Description';
		jsonData.id = uuidv4();
		jsonData.wled = '';

		fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
		console.log('File updated');
	}
} else {
	const jsonData = {
		name: 'Default Name',
		description: 'Default Description',
		wled: '',
		id: uuidv4(),
	};

	fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
	console.log('File created');
}
