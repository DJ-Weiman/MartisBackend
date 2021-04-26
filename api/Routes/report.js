const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const dbService = require('../controller/reportDbService');
const { urlencoded } = require('body-parser');
const db = dbService.getDbServiceInstance();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/getReports', (req, res) => {
	const inspectorID = req.body.inspectorID;
	const initialDate = req.body.initialDate;
	const finalDate = req.body.finalDate;
	const result = db.getReportDetails(inspectorID, initialDate, finalDate);

	result
		.then((data) => {
			console.log(data);
			res.json({ data: data });
		})
		.catch((err) => console.log(err));
});

router.post('/getAssetReports', (req, res) => {
	const assetID = req.body.assetID;
	const initialDate = req.body.initialDate;
	const finalDate = req.body.finalDate;
	const result = db.getAssetReportDetails(assetID, initialDate, finalDate);

	result
		.then((data) => {
			
			console.log(data);
			res.json({ data: data });
		})
		.catch((err) => console.log(err));
});

module.exports = router;
