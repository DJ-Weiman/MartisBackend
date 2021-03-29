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
				const repairResults = db.exportRepairs();

				repairResults
				.then((data3) =>{
					var repairData = data3;
					const accessResults = db.exportAccess();

					accessResults
					.then((data4) => {
						var accessData = data4;
						const roleResults = db.exportRoles();

						roleResults
						.then((data5) => {
							var roleData = data5;
							const dataToImport = {
								database : "martis",
								version : 1,
								encrypted : false,
								mode : "full",
								tables :[
									{
										name: "access",
										schema: [
											{column:"AccessID", value: "TEXT PRIMARY KEY NOT NULL"},
											{column:"Access", value: "TEXT NOT NULL"}
										],
										values: accessData
									},
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
										name: "role",
										schema: [
											{column: "RoleID", value:"TEXT PRIMARY KEY NOT NULL"},
											{column: "Title", value: "TEXT NOT NULL"},
											{column: "CreatedDate", value: "TEXT NOT NULL"},
											{column: "UpdatedDate", value: "TEXT DEFAULT NULL"},
											{column: "DeletedDate", value: "TEXT DEFAULT NULL"},
										],
										values: roleData
									},
									{
										name: "test",
										schema: [
											{column:"TestID", value: "TEXT PRIMARY KEY NOT NULL"},
											{column:"DateIssued", value:"TEXT NOT NULL"},
											{column:"AssetID", value:"TEXT NOT NULL"},
											{column:"InspectorID", value:"TEXT NOT NULL"},
											{column:"Result", value:"TEXT DEFAULT NULL"},
											{column:"SupervisorID", value:"TEXT NOT NULL"},
											{column:"DateCompleted", value:"TEXT DEFAULT NULL"},
											{column:"Frequency", value:"TEXT NOT NULL"},
											{column:"Priority", value:"TEXT DEFAULT NULL"},
											{column:"TestModID", value:"TEXT NOT NULL"},
											{column:"comments", value:"TEXT DEFAULT NULL"}
										],
										values: testData
									},
									{
										name: "repair",
										schema: [
											{column:"EngineerID", value: "TEXT DEFAULT NULL"},
											{column:"AssetID", value:"TEXT NOT NULL"},
											{column:"CreatedDate", value:"TEXT NOT NULL"},
											{column:"CompletedDate", value:"TEXT DEFAULT NULL"},
											{column:"comments", value:"TEXT DEFAULT NULL"},
											{constraint:"PK_asset_cd", value:"PRIMARY KEY (AssetID, CreatedDate)"}
										],
										values: repairData
									}
								]
							};
							res.json(dataToImport);
						})
						.catch((err) => console.log(err));
					})
					.catch((err) => console.log(err));
					
				})
				.catch((err) => console.log(err));
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