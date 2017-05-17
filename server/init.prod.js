const express = require('express');

module.exports = app => {
	app.use('/', express.static(process.cwd() + '/build'));

	app.get('*', (_, res) => {
		res.sendFile(path.resolve(__dirname, '../build/index.html'));
	});
};
