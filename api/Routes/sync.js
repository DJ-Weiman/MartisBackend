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
							const userResults = db.exportUsers();

							userResults
							.then((data6) => {
								var userData = data6;
								const deviceResults = db.exportDevices();

								deviceResults
								.then((data7) => {
									var deviceData = data7;
									const roleaccessResults = db.exportRoleAccess();
									
									roleaccessResults
									.then((data8) =>{
										var roleaccessData = data8;
										const testmoduleResults = db.exportTestModules();

										testmoduleResults
										.then((data9) => {
											var testmoduleData = data9;
											const dataToImport = {
												access: accessData,
												asset: assetData,
												role: roleData,
												user: userData,
												device: deviceData,
												repair: repairData,
												roleaccess: roleaccessData,
												testmodule: testmoduleData,
												test: testData
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