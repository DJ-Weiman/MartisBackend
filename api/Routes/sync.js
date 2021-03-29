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
				const dataToImport = {
					database : "martis",
					version : 1,
					encrypted : false,
					mode : "full",
					tables :[
						{
							name: "asset",
							schema: [
								{column:"AssetID", value: "TEXT PRIMARY KEY NOT NULL"},
								{column:"AssetType", value:"TEXT DEFAULT NULL"},
								{column:"Status", value:"TEXT DEFAULT NULL"},
								{column:"GPSLatitude", value:"TEXT DEFAULT NULL"},
								{column:"GPSLongitude", value:"TEXT DEFAULT NULL"},
								{column:"Region", value:"TEXT DEFAULT NULL"},
								{column:"Division", value:"TEXT DEFAULT NULL"},
								{column:"SubDivision", value:"TEXT DEFAULT NULL"},
								{column:"NearestMilePost", value:"TEXT DEFAULT NULL"},
								{column:"LastTestedDate", value:"TEXT DEFAULT NULL"}
							],
							values: assetData
						},
						{
							name: "test",
							schema: [
								{column:"TestID", value: "TEXT PRIMARY KEY NOT NULL"},
								{column:"AssetType", value:"TEXT DEFAULT NULL"},
								{column:"Status", value:"TEXT DEFAULT NULL"},
								{column:"GPSLatitude", value:"TEXT DEFAULT NULL"},
								{column:"GPSLongitude", value:"TEXT DEFAULT NULL"},
								{column:"Region", value:"TEXT DEFAULT NULL"},
								{column:"Division", value:"TEXT DEFAULT NULL"},
								{column:"SubDivision", value:"TEXT DEFAULT NULL"},
								{column:"NearestMilePost", value:"TEXT DEFAULT NULL"},
								{column:"LastTestedDate", value:"TEXT DEFAULT NULL"}
							],
							values: testData
						}
					]
				};
				res.json(dataToImport);
			})
			.catch((err) => console.log(err));

		//	res.json(dataToImport);
		})
		.catch((err) => console.log(err));
});



module.exports = router;