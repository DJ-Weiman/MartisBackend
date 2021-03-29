const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const dbService = require('../controller/syncDbService');
const { urlencoded } = require('body-parser');
const db = dbService.getDbServiceInstance();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/export', (req, res) => {
	const result = db.exportAssets();

	result
		.then((data) => {
			console.log(data);
			var assetData = data;
			const testResults = db.exportTests();
			testResults
			.then((data2) => {
				var testData = data2;
				dataToImport = {
					assets : assetData,
					tests  : testData
				};
				res.json(dataToImport);
			})
			.catch((err) => console.log(err));

		//	res.json(dataToImport);
		})
		.catch((err) => console.log(err));
});

router.get('/exportTests', (req, res) => {
	const result = db.exportTests();

	result
		.then((data) => {
			console.log(data);
		
		res.json(data);
		})
		.catch((err) => console.log(err));
});



module.exports = router;